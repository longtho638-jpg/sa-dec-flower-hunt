import { NextRequest, NextResponse } from 'next/server'
import { runContentGenerator } from '@/lib/agents/content-generator'
import { runLeadNurture, startWelcomeSequence } from '@/lib/agents/lead-nurture'
import { processReferral, onPurchase, createReferralForUser } from '@/lib/agents/viral-loop'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// POST: Run specific agent
export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const agent = searchParams.get('agent')

    try {
        let result

        switch (agent) {
            case 'content':
                result = await runContentGenerator()
                break

            case 'nurture':
                result = await runLeadNurture()
                break

            case 'referral-use': {
                const body = await request.json()
                result = await processReferral(body.code, body.email, body.orderId)
                break
            }

            case 'referral-create': {
                const body = await request.json()
                result = await createReferralForUser(body.userId, body.email, body.name)
                break
            }

            case 'purchase-complete': {
                const body = await request.json()
                result = await onPurchase(body.orderId, body.email, body.name)
                break
            }

            case 'start-welcome': {
                const body = await request.json()
                result = await startWelcomeSequence(body.leadId)
                break
            }

            case 'all':
                // Run all daily agents
                const contentResult = await runContentGenerator()
                const nurtureResult = await runLeadNurture()
                result = {
                    content: contentResult,
                    nurture: nurtureResult,
                    timestamp: new Date().toISOString()
                }
                break

            default:
                return NextResponse.json(
                    { error: `Unknown agent: ${agent}. Available: content, nurture, referral-use, referral-create, purchase-complete, start-welcome, all` },
                    { status: 400 }
                )
        }

        return NextResponse.json({ success: true, agent, result })

    } catch (error: unknown) {
        console.error(`[Growth Agent] Error running ${agent}:`, error)
        return NextResponse.json(
            { error: 'Agent execution failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
}

// GET: Get agent status and metrics
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') || 'status'

    try {
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        if (action === 'status') {
            // Get recent agent runs
            const { data: recentRuns } = await supabase
                .from('agent_runs')
                .select('*')
                .order('started_at', { ascending: false })
                .limit(10)

            // Get today's metrics
            const today = new Date().toISOString().split('T')[0]
            const { data: todayMetrics } = await supabase
                .from('growth_metrics')
                .select('*')
                .eq('date', today)
                .single()

            // Get pending content
            const { data: pendingContent, count: pendingCount } = await supabase
                .from('content_queue')
                .select('*', { count: 'exact' })
                .eq('status', 'pending')
                .limit(5)

            return NextResponse.json({
                success: true,
                status: {
                    recentRuns,
                    todayMetrics,
                    pendingContent,
                    pendingContentCount: pendingCount
                }
            })
        }

        if (action === 'metrics') {
            // Get metrics for last 7 days
            const { data: metrics } = await supabase
                .from('growth_metrics')
                .select('*')
                .order('date', { ascending: false })
                .limit(7)

            return NextResponse.json({ success: true, metrics })
        }

        if (action === 'content-queue') {
            const { data: queue } = await supabase
                .from('content_queue')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20)

            return NextResponse.json({ success: true, queue })
        }

        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })

    } catch (error: unknown) {
        console.error('[Growth Agent] Error:', error)
        return NextResponse.json(
            { error: 'Failed to get status' },
            { status: 500 }
        )
    }
}
