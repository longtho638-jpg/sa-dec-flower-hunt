import { NextRequest, NextResponse } from 'next/server';

// Dynamically import to avoid build-time issues with Node.js modules
async function getAgentRouter() {
    const { AgentRouter } = await import('@/bizplan-cli-toolkit/src/orchestrator/agent-router');
    return new AgentRouter();
}

export async function GET(req: NextRequest) {
    try {
        const router = await getAgentRouter();
        const capabilities = router.getCapabilities();

        return NextResponse.json({
            success: true,
            totalAgents: capabilities.length,
            agents: capabilities.map(agent => ({
                id: agent.id,
                name: agent.name,
                description: agent.description,
                dependencies: agent.dependencies
            }))
        });
    } catch (error: any) {
        console.error('Agent list error:', error);
        return NextResponse.json(
            { error: 'Failed to list agents', details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { agentId, input = {} } = body;

        if (!agentId) {
            return NextResponse.json(
                { error: 'agentId is required' },
                { status: 400 }
            );
        }

        // Validate agent exists
        const router = await getAgentRouter();

        if (!router.hasAgent(agentId)) {
            return NextResponse.json({
                error: `Agent ${agentId} not found`,
                availableAgents: router.listAgentIds()
            }, { status: 404 });
        }

        const agent = router.getAgent(agentId);
        const startTime = Date.now();

        console.log(`🤖 Executing Agent ${agentId}: ${agent.name}`);

        // Prepare input with context
        const agentInput = {
            ...input,
            context: {
                previousOutputs: new Map(),
                ...(input.context || {})
            }
        };

        // Execute with timeout (30 seconds max)
        const result = await Promise.race([
            agent.execute(agentInput),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Agent execution timeout (30s)')), 30000)
            )
        ]);

        const executionTime = Date.now() - startTime;
        console.log(`✅ Agent ${agentId} completed in ${executionTime}ms`);

        return NextResponse.json({
            success: true,
            agentId,
            agentName: agent.name,
            executionTimeMs: executionTime,
            output: result,
            executedAt: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('Agent execution error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Agent execution failed',
                details: error.message
            },
            { status: 500 }
        );
    }
}
