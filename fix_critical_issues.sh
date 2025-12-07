#!/bin/bash

# CRITICAL SECURITY & STABILITY FIX SCRIPT
# Use: ./fix_critical_issues.sh [phase]
# Phases: all, security, stability, errors, test

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

PHASE=${1:-"all"}

print_header() {
  echo -e "\n${BLUE}═══════════════════════════════════════${NC}"
  echo -e "${BLUE}$1${NC}"
  echo -e "${BLUE}═══════════════════════════════════════${NC}\n"
}

print_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
  echo -e "${RED}✗ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

# Phase 1: Security Fixes
phase_security() {
  print_header "PHASE 1: CRITICAL SECURITY FIXES"
  
  echo "1. Scanning for shell command execution..."
  grep -r "execAsync\|exec(\|spawnSync\|system(" app lib --include="*.ts" --include="*.tsx" || print_warning "No obvious shell exec found (verify manually)"
  
  echo -e "\n2. Checking for hardcoded credentials..."
  grep -r "password\|secret\|key\|token" .env* --include="*.env*" || print_warning "Check .env files manually"
  
  echo -e "\n3. Validating input sanitization..."
  grep -r "JSON.parse\|eval\|new Function" app lib --include="*.ts" --include="*.tsx" | head -20 || print_success "No obvious eval usage"
  
  echo -e "\n4. Checking query parameters..."
  grep -r "searchParams.get\|req.query\|req.body" app --include="*.ts" | head -20
  
  print_success "Security scan complete - review findings above"
}

# Phase 2: Stability Fixes
phase_stability() {
  print_header "PHASE 2: STABILITY FIXES"
  
  echo "1. Checking PayOS initialization..."
  grep -A5 "if (!payOS)" lib/payos.ts || print_warning "PayOS check not found"
  
  echo -e "\n2. Checking Gemini timeout..."
  grep -r "timeout\|AbortController" lib/gemini* --include="*.ts" || print_warning "No timeout found in Gemini"
  
  echo -e "\n3. Checking database mock fallbacks..."
  grep -r "createMockClient\|mock.*client" lib --include="*.ts" || print_success "No mock clients found"
  
  echo -e "\n4. Checking transaction handling..."
  grep -r "transaction\|BEGIN\|COMMIT\|ROLLBACK" app --include="*.ts" | wc -l
  
  print_success "Stability audit complete"
}

# Phase 3: Error Handling
phase_errors() {
  print_header "PHASE 3: ERROR HANDLING AUDIT"
  
  echo "1. Finding empty catch blocks..."
  grep -n "catch.*{}" app lib --include="*.ts" --include="*.tsx" -r
  
  echo -e "\n2. Finding catch blocks with no logging..."
  grep -B2 "catch (e) {}" app lib --include="*.ts" --include="*.tsx" -r | head -30
  
  echo -e "\n3. Checking for console.error without context..."
  grep -n "console.error('Error'" app lib --include="*.ts" --include="*.tsx" -r
  
  echo -e "\n4. Checking for generic error messages..."
  grep -n "Something went wrong\|Error\|Failed" components --include="*.tsx" -r | wc -l
  
  print_success "Error handling audit complete"
}

# Phase 4: Testing
phase_test() {
  print_header "PHASE 4: DEPLOYMENT TESTING"
  
  echo "1. Building application..."
  npm run build || {
    print_error "Build failed"
    exit 1
  }
  print_success "Build successful"
  
  echo -e "\n2. Running linter..."
  npm run lint 2>/dev/null || print_warning "Lint warnings (non-blocking)"
  
  echo -e "\n3. Type checking..."
  npx tsc --noEmit || {
    print_error "TypeScript errors found"
    exit 1
  }
  print_success "TypeScript checks passed"
  
  echo -e "\n4. Checking environment variables..."
  required_vars=("NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY")
  for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
      print_error "Missing: $var"
    else
      print_success "Found: $var"
    fi
  done
  
  print_success "Testing phase complete"
}

# Run requested phases
case $PHASE in
  security)
    phase_security
    ;;
  stability)
    phase_stability
    ;;
  errors)
    phase_errors
    ;;
  test)
    phase_test
    ;;
  all)
    phase_security
    phase_stability
    phase_errors
    phase_test
    print_header "ALL PHASES COMPLETE"
    echo -e "${GREEN}Next steps:${NC}"
    echo "1. Review findings in CRITICAL_FIXES_PRE_LAUNCH.md"
    echo "2. Fix issues in priority order"
    echo "3. Run ./fix_critical_issues.sh test to verify"
    echo "4. Deploy to staging for full testing"
    ;;
  *)
    echo "Usage: ./fix_critical_issues.sh [phase]"
    echo "Phases: all (default), security, stability, errors, test"
    ;;
esac
