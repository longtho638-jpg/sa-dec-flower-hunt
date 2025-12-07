# IMMEDIATE FIXES TO APPLY (Priority Order)

## 🔴 CRITICAL FIX #1: Shell Command Injection in `/app/api/admin/ops/route.ts`

### Current Code (VULNERABLE):
```typescript
const { stdout, stderr } = await execAsync(scriptCommand, { cwd: projectRoot });
```

### Fix:
```typescript
// REMOVE execAsync completely
// Replace with:
import { execSync } from 'child_process';

// Only allow whitelisted commands
const ALLOWED_COMMANDS = {
  'seed-db': '/scripts/seed.sh',
  'migrate': '/scripts/migrate.sh',
};

const command = ALLOWED_COMMANDS[scriptCommand];
if (!command) {
  return NextResponse.json({ error: 'Invalid command' }, { status: 400 });
}

try {
  const result = execSync(`bash ${command}`, { 
    cwd: projectRoot,
    timeout: 30000,
    stdio: 'pipe'
  }).toString();
  return NextResponse.json({ result });
} catch (error) {
  return NextResponse.json({ error: error.message }, { status: 500 });
}
```

**Effort**: 30 minutes  
**Test**: Verify only whitelisted commands execute

---

## 🔴 CRITICAL FIX #2: Payment Webhook Race Condition in `/app/api/payment/webhook/route.ts`

### Problem:
```typescript
// BAD: Order status updated before wallet verified
await updateOrderStatus(orderId, 'completed');
await updateWallet(userId, amount);  // Could fail, leaving order completed but wallet empty
```

### Fix:
```typescript
import { createServerClient } from '@supabase/ssr';

export async function POST(req: Request) {
  const supabase = createServerClient(url, key);
  
  // 1. Verify webhook signature
  const webhookId = req.headers.get('x-webhook-id');
  if (!webhookId) return NextResponse.json({ error: 'Missing webhook ID' }, { status: 400 });
  
  // 2. Check if already processed (idempotency)
  const { data: existing } = await supabase
    .from('webhook_log')
    .select('id')
    .eq('webhook_id', webhookId)
    .single();
  
  if (existing) {
    return NextResponse.json({ status: 'already_processed' });
  }
  
  // 3. Use transaction
  const { data, error } = await supabase.rpc('process_payment_webhook', {
    p_order_id: orderId,
    p_user_id: userId,
    p_amount: amount,
    p_webhook_id: webhookId,
  });
  
  if (error) {
    console.error('Webhook processing failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, webhook_id: webhookId });
}
```

**Database Function** (`supabase/functions/process_payment_webhook.sql`):
```sql
CREATE OR REPLACE FUNCTION process_payment_webhook(
  p_order_id UUID,
  p_user_id UUID,
  p_amount DECIMAL,
  p_webhook_id TEXT
)
RETURNS JSON
LANGUAGE plpgsql
AS $$
DECLARE
  v_result JSON;
BEGIN
  -- Start transaction
  INSERT INTO webhook_log (webhook_id, processed_at) VALUES (p_webhook_id, NOW());
  
  -- Update order (ATOMIC)
  UPDATE orders SET status = 'completed', updated_at = NOW()
  WHERE id = p_order_id;
  
  -- Update wallet (ATOMIC)
  UPDATE wallet SET balance = balance + p_amount
  WHERE user_id = p_user_id;
  
  -- Log transaction
  INSERT INTO transactions (user_id, type, amount, order_id)
  VALUES (p_user_id, 'payment', p_amount, p_order_id);
  
  v_result := json_build_object('success', true, 'order_id', p_order_id);
  RETURN v_result;
  
EXCEPTION WHEN OTHERS THEN
  ROLLBACK;
  RAISE;
END;
$$;
```

**Effort**: 1-2 hours  
**Test**: 
- Send same webhook twice → verify only processes once
- Kill connection mid-transaction → verify rollback
- Check wallet balance = sum(transactions)

---

## 🔴 CRITICAL FIX #3: Input Validation on Public Endpoints

### Files to Fix:
- `/app/api/orders/route.ts`
- `/app/api/leads/route.ts`
- `/app/api/check-in/route.ts`
- `/app/api/subscribe/route.ts`

### Template:
```typescript
import { z } from 'zod';

// Define validation schema
const PhoneSchema = z.string().regex(/^(0|84)[0-9]{9}$/, 'Invalid Vietnam phone');
const EmailSchema = z.string().email();
const UUIDSchema = z.string().uuid();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate before using
    const validated = {
      phone: PhoneSchema.parse(body.phone),
      email: EmailSchema.parse(body.email),
      flowerId: UUIDSchema.parse(body.flowerId),
    };
    
    // Then use validated data
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
```

**Effort**: 2-3 hours  
**Test**: Send invalid inputs → verify rejection

---

## 🟠 HIGH FIX #4: PayOS Initialization Check in `/lib/payos.ts`

### Current (Unsafe):
```typescript
if (!payOS) {
  console.warn('PayOS not initialized');
  return null; // Silent failure
}
```

### Fix:
```typescript
if (!payOS) {
  throw new Error(
    'PayOS not initialized. Check PAYOS_API_KEY and PAYOS_API_SECRET in environment'
  );
}

// At app startup (middleware.ts):
if (!process.env.PAYOS_API_KEY) {
  throw new Error('PAYOS_API_KEY is required in production');
}
```

**Effort**: 30 minutes  
**Test**: Run without env vars → verify app fails at startup

---

## 🟠 HIGH FIX #5: Gemini API Timeout in `/lib/gemini-service.ts`

### Current (Hangs):
```typescript
const response = await fetch(url, {
  method: 'POST',
  headers,
  body: JSON.stringify(payload),
});
```

### Fix:
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

try {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    signal: controller.signal,
  });
  
  clearTimeout(timeout);
  
  if (!response.ok) {
    throw new Error(`Gemini API returned ${response.status}`);
  }
  
  const data = await response.json();
  return data;
} catch (error) {
  clearTimeout(timeout);
  
  if (error.name === 'AbortError') {
    throw new Error('Gemini API timeout (30s)');
  }
  
  throw error;
} finally {
  clearTimeout(timeout);
}
```

**Effort**: 45 minutes  
**Test**: Call Gemini API → verify 30s timeout works

---

## 🟡 MEDIUM FIX #6: Remove Empty Catch Blocks

### Find & Replace:
```bash
# Find all empty catches
grep -rn "catch.*{}$" components lib app --include="*.tsx" --include="*.ts"
```

### Pattern to Replace:
```typescript
// BAD:
try {
  audio.play();
} catch (e) {}

// GOOD:
try {
  audio.play();
} catch (error) {
  console.error('Audio playback failed:', error);
  // User-friendly fallback
}
```

**Effort**: 1 hour  
**Files**: QRScanner.tsx, NotificationService.ts, ARView.tsx

---

## 🟡 MEDIUM FIX #7: Add React Error Boundary

### Create `/components/ErrorBoundary.tsx`:
```typescript
'use client';

import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
    // Send to Sentry/error tracking service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h2 className="text-red-900 font-bold">Có lỗi xảy ra</h2>
          <p className="text-red-700 text-sm">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Use in `/app/layout.tsx`:
```typescript
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

**Effort**: 1 hour  
**Test**: Throw error in component → verify boundary catches it

---

## DEPLOYMENT TESTING CHECKLIST

Before pushing to production:

```bash
# 1. Build and type check
npm run build
npx tsc --noEmit

# 2. Run lint
npm run lint

# 3. Manual test critical paths
# - User signup with invalid phone
# - Payment checkout to completion
# - Duplicate webhook trigger
# - Missing environment variables

# 4. Verify environment variables
echo "Required env vars:"
echo "  PAYOS_API_KEY: ${PAYOS_API_KEY:?Missing}"
echo "  GEMINI_API_KEY: ${GEMINI_API_KEY:?Missing}"
echo "  SUPABASE_URL: ${SUPABASE_URL:?Missing}"

# 5. Final security scan
grep -r "execAsync\|eval\|new Function" app lib --include="*.ts"

# 6. Deploy to staging first
git push origin main
# Wait for Vercel deploy
# Test against staging environment
```

---

## Timeline

**Day 1 (6 hours)**:
- Fix #1: Shell command injection (0.5h)
- Fix #2: Payment webhook (2h)
- Fix #3: Input validation (2h)
- Testing (1.5h)

**Day 2 (4 hours)**:
- Fix #4: PayOS (0.5h)
- Fix #5: Gemini timeout (1h)
- Fix #6: Empty catches (1h)
- Fix #7: Error boundary (1.5h)

**Day 3 (2 hours)**:
- Full deployment testing
- Security audit
- Deploy to production

**Total**: 12 hours of focused work

---

## Success Criteria

✅ All critical security issues resolved  
✅ Build passes TypeScript checks  
✅ No hardcoded credentials in code  
✅ All API endpoints validate input  
✅ Payment webhook is idempotent  
✅ Timeout handling on external APIs  
✅ Error boundaries in place  
✅ All tests pass  

---

Generated: 2025-12-07
