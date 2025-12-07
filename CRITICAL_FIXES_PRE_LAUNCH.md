# 🚨 CRITICAL FIXES BEFORE LAUNCH - Deep Scan Report

**Date**: Dec 7, 2025  
**Status**: PRE-DEPLOYMENT SECURITY & STABILITY AUDIT  
**Priority Levels**: 🔴 CRITICAL | 🟠 HIGH | 🟡 MEDIUM

---

## TIER 1: CRITICAL SECURITY VULNERABILITIES (MUST FIX BEFORE DEPLOY)

### 1.1 🔴 Shell Command Injection - `/app/api/admin/ops/route.ts`
**Risk**: Arbitrary code execution  
**Issue**: Line 75 executes shell commands from user input without sanitization
```typescript
// VULNERABLE:
const result = execAsync(command); // command from req.body without validation
```
**Fix Required**:
- ❌ Remove shell command execution from API
- ✅ Use proper Node.js APIs or sandbox execution
- ✅ Whitelist only specific allowed operations

**Effort**: 2-4 hours  
**Owner**: Security + Backend Team  

---

### 1.2 🔴 Payment Webhook Race Condition - `/app/api/payment/webhook/route.ts`
**Risk**: Double payment, wallet inconsistency  
**Issues**:
- No database transaction wrapping webhook operations
- Order status updated before wallet update verification
- Multiple unvalidated property accesses on order object

**Code Issues**:
```typescript
// PROBLEMATIC SEQUENCE:
1. Update order.status = 'completed' 
2. Update wallet.balance (no rollback if this fails)
3. No idempotency check for duplicate webhook calls
```

**Fix Required**:
- ✅ Use database transaction (BEGIN...COMMIT...ROLLBACK)
- ✅ Add idempotency key check (webhook_id in transaction_log)
- ✅ Validate entire order object structure before processing
- ✅ Test with duplicate webhook triggers

**Effort**: 4-6 hours  
**Owner**: Backend + Payment Team  

---

### 1.3 🔴 Unvalidated Input Processing - `/app/api/orders/route.ts`, `/app/api/leads/route.ts`
**Risk**: Invalid data in database, potential injection  
**Issues**:
- Phone numbers not validated (format, length)
- FlowerID not verified exists before operations
- QR codes not validated format
- Email not validated format

**Fix Required**:
- ✅ Add input validators (zod/joi) for all endpoints
- ✅ Database constraints: UNIQUE, NOT NULL, CHECK constraints
- ✅ Validate enums (status, payment_method, etc.)

**Effort**: 3-4 hours  
**Owner**: Backend + QA  

---

## TIER 2: HIGH IMPACT TECHNICAL DEBT

### 2.1 🟠 PayOS Integration Fragility - `/lib/payos.ts`
**Risk**: Runtime crashes, failed payments  
**Issues**:
- PayOS client may be null but no null checks in functions
- Webhook verification returns false silently instead of throwing
- No timeout configuration

```typescript
// VULNERABLE:
if (!payOS) {
  console.warn('PayOS not initialized'); // But code continues!
  return null; // Silent failure
}
```

**Fix Required**:
- ✅ Throw error if PayOS not initialized (fail fast)
- ✅ Add timeout handling (30s default)
- ✅ Proper webhook signature verification with error context
- ✅ Add init check at app startup

**Effort**: 2-3 hours  
**Owner**: Payment Team  

---

### 2.2 🟠 Gemini API Robustness - `/lib/gemini-service.ts`, `/app/api/ai-chat/route.ts`
**Risk**: AI features break without user knowledge  
**Issues**:
- No timeout handling (API hangs indefinitely)
- JSON parsing errors silently return `{ raw_output: true }`
- No retry logic for transient failures
- Missing environment variable validation

**Fix Required**:
- ✅ Add 30s timeout with abort controller
- ✅ Add retry logic (3 attempts with exponential backoff)
- ✅ Proper error messages when API fails
- ✅ Validate API_KEY at startup
- ✅ Add rate limiting checks

**Effort**: 3-4 hours  
**Owner**: AI/Backend Team  

---

### 2.3 🟠 Database Fallback Antipattern - `/lib/supabase.ts`, `/lib/goal-service.ts`, `/lib/gamification-service.ts`
**Risk**: Silent data loss, false feature availability  
**Issues**:
- Creates mock client when env vars missing
- Returns empty arrays instead of errors
- Application thinks it's working when it's not

```typescript
// ANTIPATTERN:
const client = process.env.SUPABASE_URL ? createClient(...) : createMockClient();
// Later: queries return [] silently
```

**Fix Required**:
- ✅ Throw error at startup if required env vars missing
- ✅ Health check endpoint that verifies database connection
- ✅ Clear error messages in UI when services unavailable

**Effort**: 2-3 hours  
**Owner**: Infrastructure + Backend  

---

## TIER 3: MEDIUM PRIORITY ERROR HANDLING

### 3.1 🟡 Missing Error Boundaries - Components
**Risk**: App crashes completely on component error  
**Components**: Any component using async data or external APIs
**Fix Required**:
- ✅ Add React Error Boundary wrapper
- ✅ Add try-catch in useEffect for async operations
- ✅ Graceful fallback UI

**Effort**: 2-3 hours  
**Owner**: Frontend Team  

---

### 3.2 🟡 Empty Catch Blocks - `/components/QRScanner.tsx`
**Risk**: Swallows errors, hard to debug  
```typescript
// ANTIPATTERN:
try {
  audio.play();
} catch (e) {} // Silently fails
```

**Fix Required**:
- ✅ Replace with proper error logging
- ✅ User notification for critical failures
- ✅ Structured logging with context

**Effort**: 1 hour  
**Owner**: Frontend Team  

---

### 3.3 🟡 API Error Messages - `/components/LeadCaptureForm.tsx`
**Risk**: Users confused, no debugging info  
```typescript
// VAGUE:
"Không thể gửi. Vui lòng thử lại!" // Doesn't indicate real problem
```

**Fix Required**:
- ✅ Map API errors to user-friendly Vietnamese messages
- ✅ Log detailed errors for debugging
- ✅ Add retry mechanism

**Effort**: 1-2 hours  
**Owner**: Frontend Team  

---

## DEPLOYMENT CHECKLIST

### Pre-Deployment Tests (MUST PASS)

- [ ] **Security Scan**
  - [ ] No hardcoded credentials
  - [ ] No shell command execution
  - [ ] Input validation on all endpoints
  - [ ] SQL injection test (ORM prevents, but verify)

- [ ] **Payment Critical Path**
  - [ ] Test PayOS webhook with duplicate triggers
  - [ ] Test order → wallet update in transaction
  - [ ] Test payment failure rollback
  - [ ] Test concurrent checkout requests

- [ ] **API Stability**
  - [ ] Timeout test (30s+ on Gemini API)
  - [ ] Database unavailable test
  - [ ] Malformed input test
  - [ ] Rate limiting test

- [ ] **Database Consistency**
  - [ ] No orphaned orders (order without user)
  - [ ] Wallet balance = sum(transactions) verification
  - [ ] No duplicate transactions
  - [ ] Backup & restore test

- [ ] **Error Messages**
  - [ ] All 4xx errors have clear messages
  - [ ] Logs have proper context (request ID, timestamp, user_id)
  - [ ] Monitoring alerts configured

---

## PHASED FIX PLAN

### Phase 1: CRITICAL SECURITY (Day 1)
- [ ] Remove shell command execution
- [ ] Add input validation to all public endpoints
- [ ] Fix payment webhook race condition
- [ ] Deploy to staging, run security tests

**Effort**: 8-10 hours

### Phase 2: STABILITY (Day 2)
- [ ] Fix PayOS initialization checks
- [ ] Add Gemini API timeout & retry
- [ ] Remove database mock fallbacks
- [ ] Add health checks

**Effort**: 6-8 hours

### Phase 3: ERROR HANDLING (Day 3)
- [ ] Add React Error Boundaries
- [ ] Fix empty catch blocks
- [ ] Improve error messages
- [ ] Full integration testing

**Effort**: 4-6 hours

### Phase 4: DEPLOYMENT (Day 4)
- [ ] Final security scan
- [ ] Load testing
- [ ] Staging → Production deployment
- [ ] Monitoring verification

---

## MONITORING & OBSERVABILITY

**Before Launch, Add**:
- [ ] Sentry/error tracking integration
- [ ] DataDog/CloudWatch for API performance
- [ ] Payment webhook monitoring (success/failure rate)
- [ ] Database query performance monitoring
- [ ] Alert for errors spike (>10% error rate)

---

## FOLLOW-UP TECHNICAL DEBT

These can be fixed post-launch but should be tracked:

1. **Add comprehensive test suite** (unit, integration, e2e)
2. **API documentation** (OpenAPI/Swagger)
3. **Database migration scripts** for future changes
4. **Structured logging** (JSON format for parsing)
5. **Performance optimization** (DB indexes, caching)
6. **Feature flags** for safe rollouts

---

## Questions to Clarify

1. **PayOS vs VNPay**: Which is production payment gateway?
2. **Environment**: Staging vs Production URLs/Keys?
3. **Phone number format**: International or Vietnam only (09xxxxxxx)?
4. **SLA requirements**: Expected uptime/error rate?
5. **Backup strategy**: Frequency and restoration test?

---

**Generated**: 2025-12-07  
**Status**: Ready for Immediate Action  
**Estimated Total Fix Time**: 20-30 hours
