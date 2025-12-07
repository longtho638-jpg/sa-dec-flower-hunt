# 🔧 TECHNICAL DEBT & BUG TRACKER - LIVE UPDATE

**Last Updated**: 2025-12-07 22:30 UTC  
**Status**: AUDIT COMPLETE - READY FOR FIXES  
**Owner**: Dev Team  
**Target Deploy**: Monday 2025-12-09

---

## 📊 ISSUE SUMMARY

| Severity | Count | Status | Est. Fix Time |
|----------|-------|--------|---------------|
| 🔴 CRITICAL | 3 | Identified | 6 hours |
| 🟠 HIGH | 5 | Identified | 4 hours |
| 🟡 MEDIUM | 4 | Identified | 2 hours |
| **TOTAL** | **12** | **READY** | **12 hours** |

---

## 🔴 CRITICAL ISSUES (BLOCK DEPLOYMENT)

### 1. Shell Command Injection - SECURITY CRITICAL
**File**: `/app/api/admin/ops/route.ts`  
**Line**: 75  
**Severity**: 🔴 CRITICAL  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
const { stdout, stderr } = await execAsync(scriptCommand, { cwd: projectRoot });
```
- Accepts user input directly to shell
- Attacker can execute arbitrary commands
- Example: `rm -rf /` injected via API

**Fix**: 
- Whitelist only 2-3 allowed commands (seed, migrate)
- Reject any other input
- Use `execSync` with fixed script paths

**Test**: Send malicious command → verify rejection  
**Effort**: 30 minutes  
**Owner**: Backend Dev  

---

### 2. Payment Webhook Race Condition - DATA CRITICAL
**File**: `/app/api/payment/webhook/route.ts`  
**Severity**: 🔴 CRITICAL  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
// BAD SEQUENCE:
await updateOrderStatus(orderId, 'completed');  // No rollback point
await updateWallet(userId, amount);             // Could fail here
```
- Same webhook fires twice → double credit
- Order marked complete but wallet not updated → money lost
- No transaction wrapping

**Fix**:
1. Add webhook idempotency (check webhook_id already processed)
2. Wrap in database transaction (BEGIN...COMMIT...ROLLBACK)
3. If payment fails, entire transaction rolls back

**Test**: 
- Send webhook twice → verify only processes once
- Kill connection mid-transaction → verify rollback

**Effort**: 1.5 hours  
**Owner**: Payment Team  

---

### 3. No Input Validation - INTEGRITY CRITICAL
**Files**: 
- `/app/api/orders/route.ts`
- `/app/api/leads/route.ts`
- `/app/api/check-in/route.ts`
- `/app/api/subscribe/route.ts`

**Severity**: 🔴 CRITICAL  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
// NO VALIDATION:
const phone = searchParams.get('phone');      // Could be "abc", empty, etc.
const email = body.email;                     // Not validated
const flowerId = body.flowerId;               // Could be invalid UUID
```
- Junk data in database
- Invalid phone numbers stored
- Bad emails cause email failures
- Invalid IDs cause query errors

**Fix**: Add Zod schema validation
```typescript
const PhoneSchema = z.string().regex(/^(0|84)[0-9]{9}$/);
const EmailSchema = z.string().email();
const UUIDSchema = z.string().uuid();

const validated = {
  phone: PhoneSchema.parse(body.phone),
  email: EmailSchema.parse(body.email),
};
```

**Test**: Send invalid data → verify 400 error  
**Effort**: 1.5 hours  
**Owner**: Backend Dev  

---

## 🟠 HIGH PRIORITY ISSUES (MUST FIX BEFORE LAUNCH)

### 4. PayOS Not Initialized - SILENT FAILURE
**File**: `/lib/payos.ts`  
**Severity**: 🟠 HIGH  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
if (!payOS) {
  console.warn('PayOS not initialized');  // Just logs, continues
  return null;                             // Silent return
}
```
- App starts without payment system
- Users try to pay → silent fail
- No error in logs, hard to debug

**Fix**: Throw error at startup
```typescript
if (!payOS) {
  throw new Error('PAYOS_API_KEY not set in environment');
}
```

**Test**: Start without PAYOS_API_KEY → app should fail  
**Effort**: 30 minutes  
**Owner**: DevOps/Backend  

---

### 5. Gemini API No Timeout - HANGS FOREVER
**File**: `/lib/gemini-service.ts`  
**Severity**: 🟠 HIGH  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
const response = await fetch(url, { /* no timeout */ });
```
- API hangs → user waits forever
- No retry on transient failures
- Blocks entire request

**Fix**: Add timeout + retry
```typescript
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);
const response = await fetch(url, { signal: controller.signal });
// + retry logic (3 attempts, exponential backoff)
```

**Test**: Mock slow API → verify 30s timeout  
**Effort**: 45 minutes  
**Owner**: AI Team  

---

### 6. Database Mock Fallback - SILENT DATA LOSS
**Files**: 
- `/lib/supabase.ts`
- `/lib/goal-service.ts`
- `/lib/gamification-service.ts`

**Severity**: 🟠 HIGH  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
const client = process.env.SUPABASE_URL 
  ? createClient(url, key) 
  : createMockClient();  // Silent fallback!

// Later:
const { data } = await client.from('users').select();
// Returns mock data [], app thinks it's working
```
- App starts without database
- All queries return empty or mock data
- Data appears to work but is lost

**Fix**: Throw error if env vars missing
```typescript
if (!process.env.SUPABASE_URL) {
  throw new Error('SUPABASE_URL required in environment');
}
```

**Test**: Start without env vars → app fails at init  
**Effort**: 30 minutes  
**Owner**: DevOps  

---

### 7. Empty Catch Blocks - SWALLOWED ERRORS
**Files**:
- `/components/QRScanner.tsx:44` - `catch (e) {}`
- `/lib/notifications.ts:47` - `audio.play().catch(() => {})`
- `/components/ARView.tsx:41` - `videoRef.play().catch()`

**Severity**: 🟠 HIGH  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
try {
  audio.play();
} catch (e) {}  // Error is lost!
```
- Can't debug failures
- User has no idea why audio didn't play
- Silent fail is worse than error

**Fix**: Log error
```typescript
try {
  audio.play();
} catch (error) {
  logger.error('Audio playback failed', { error });
  // User-friendly fallback UI
}
```

**Test**: Trigger error → verify logged  
**Effort**: 1 hour  
**Owner**: Frontend Dev  

---

### 8. No React Error Boundary - APP CRASH
**File**: `/app/layout.tsx`  
**Severity**: 🟠 HIGH  
**Status**: ⏳ PENDING  

**Problem**:
- One component crashes → entire app crashes
- No fallback UI
- User sees white screen

**Fix**: Add error boundary
```typescript
<ErrorBoundary>
  {children}
</ErrorBoundary>
```

**Test**: Throw error in component → boundary catches it  
**Effort**: 30 minutes  
**Owner**: Frontend Dev  

---

## 🟡 MEDIUM PRIORITY ISSUES (NICE TO FIX)

### 9. Database Constraints Missing
**Database**: Supabase  
**Severity**: 🟡 MEDIUM  
**Status**: ⏳ PENDING  

**Problem**:
- No foreign keys → orphaned orders
- No NOT NULL → null values in required fields
- No UNIQUE → duplicate users
- No CHECK → invalid status values
- No indexes → slow queries

**Fix**: SQL migration
```sql
ALTER TABLE orders ADD CONSTRAINT fk_user FOREIGN KEY (user_id);
ALTER TABLE orders ADD CONSTRAINT chk_status CHECK (status IN ('pending', 'completed'));
CREATE INDEX idx_orders_user_id ON orders(user_id);
```

**Effort**: 1 hour  
**Owner**: DevOps/DBA  

---

### 10. API Response Not Validated
**Files**: Multiple API routes  
**Severity**: 🟡 MEDIUM  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
const { data } = await supabase.from('orders').select();
// data could be null, [], malformed, etc.
// Code assumes data.items exists → crashes
```

**Fix**: Validate response
```typescript
const { data, error } = await supabase.from('orders').select();
if (error) throw error;
if (!data || data.length === 0) return [];

// Safe to use
data.forEach(order => { ... });
```

**Effort**: 1 hour  
**Owner**: Backend Dev  

---

### 11. Logging Not Structured
**Files**: Throughout  
**Severity**: 🟡 MEDIUM  
**Status**: ⏳ PENDING  

**Problem**:
```typescript
console.error('Error'); // No context
console.error('Error:', error.message); // Not searchable
```

**Fix**: Structured logging
```typescript
logger.error('payment_failed', {
  order_id: '...',
  error: error.message,
  timestamp: new Date().toISOString(),
  user_id: '...',
});
```

**Effort**: 2 hours  
**Owner**: Backend Dev  

---

## 🟢 LOW PRIORITY (POST-LAUNCH OK)

### 12. Performance Optimization
- N+1 query issues
- Missing indexes
- No caching strategy
- Large bundle size

**Effort**: 4-6 hours  
**Owner**: Performance Team  

---

## 📋 FIX CHECKLIST

### Phase 1: CRITICAL (Day 1 - 6h)
- [ ] Shell injection fix applied
- [ ] Payment webhook transaction implemented
- [ ] Input validation (zod) added to all endpoints
- [ ] Build passes ✓
- [ ] Types pass ✓
- [ ] No new console errors ✓

### Phase 2: HIGH (Day 1 afternoon - 4h)
- [ ] PayOS error thrown at init
- [ ] Gemini timeout (30s) + retry
- [ ] Database mock fallback removed
- [ ] Empty catches fixed
- [ ] Error boundary added
- [ ] Tests pass ✓

### Phase 3: MEDIUM (Day 2 - 2h)
- [ ] Database constraints added
- [ ] API responses validated
- [ ] Structured logging implemented

### Phase 4: DEPLOY (Day 2 afternoon - 1h)
- [ ] Staging tests pass ✓
- [ ] Security scan clean ✓
- [ ] Monitoring configured ✓
- [ ] Production deployment ✓

---

## 🚀 DEPLOYMENT PLAN

**Saturday 2025-12-07**:
- Start fixes immediately
- 12-16 hours of focused work

**Sunday 2025-12-08**:
- Staging verification
- Final testing
- Prepare deploy

**Monday 2025-12-09**:
- Deploy to production (8 AM)
- Monitor closely
- Rollback plan ready

---

## 📊 CURRENT STATUS

| Task | Status | Owner | ETA |
|------|--------|-------|-----|
| 🔴 #1 Shell Injection | ⏳ Not Started | Backend | 30 min |
| 🔴 #2 Payment Webhook | ⏳ Not Started | Payment | 1.5h |
| 🔴 #3 Input Validation | ⏳ Not Started | Backend | 1.5h |
| 🟠 #4 PayOS Init | ⏳ Not Started | DevOps | 30 min |
| 🟠 #5 Gemini Timeout | ⏳ Not Started | AI | 45 min |
| 🟠 #6 DB Mock | ⏳ Not Started | DevOps | 30 min |
| 🟠 #7 Empty Catches | ⏳ Not Started | Frontend | 1h |
| 🟠 #8 Error Boundary | ⏳ Not Started | Frontend | 30 min |
| 🟡 #9-12 Medium | ⏳ Backlog | Team | 4h |

---

## 🔗 RELATED FILES

- `CRITICAL_FIXES_PRE_LAUNCH.md` - Detailed audit report
- `FIXES_TO_APPLY.md` - Ready-to-copy fix code
- `fix_critical_issues.sh` - Automated scan script

---

## 👥 TEAM ASSIGNMENTS

**Backend**: Fix #1, #3, #10, #11  
**Payment**: Fix #2  
**DevOps**: Fix #4, #6, #9  
**AI**: Fix #5  
**Frontend**: Fix #7, #8  

---

**Next Action**: Start Phase 1 - 3 CRITICAL fixes (6 hours)

Generate fix code ready to apply. No more planning. Execute now.
