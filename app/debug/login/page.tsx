"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function LoginDebugPage() {
    const [status, setStatus] = useState<any>({});
    const [logs, setLogs] = useState<string[]>([]);

    function addLog(msg: string) {
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);
    }

    useEffect(() => {
        const runChecks = async () => {
            const supabase = createClient();
            addLog("Starting Debug Checks...");

            // 1. Check Env Vars
            const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
            const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
            setStatus(s => ({ ...s, env: { hasUrl, hasKey } }));
            addLog(`Env Vars Check: URL=${hasUrl}, Key=${hasKey}`);

            if (!hasUrl || !hasKey) {
                addLog("❌ CRITICAL: Missing Env Vars");
                return;
            }

            try {
                // 2. Check Auth Session
                addLog("Checking Auth Session...");
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) {
                    addLog(`❌ Auth Session Error: ${sessionError.message}`);
                } else {
                    addLog(`✅ Auth Session OK. User: ${session?.user?.email || 'Not Logged In'}`);
                }
                setStatus(s => ({ ...s, session: !!session }));

                // 3. Check DB Connection (Public Table)
                addLog("Checking DB Connection (profiles)...");
                // Select just one column to be light
                const { data, error, count } = await supabase
                    .from('profiles')
                    .select('id', { count: 'exact', head: true });

                if (error) {
                    addLog(`❌ DB Connection Failed: ${error.message} (Code: ${error.code})`);
                    addLog(`ℹ️ Hint: Check if 'profiles' table exists and RLS allows public read.`);
                } else {
                    addLog(`✅ DB Connection OK. Profiles count: ${count}`);
                }

            } catch (err: any) {
                addLog(`❌ Client Exception: ${err.message}`);
            }
        };

        runChecks();
    }, []);

    return (
        <div className="p-8 max-w-2xl mx-auto bg-black text-green-400 font-mono text-sm min-h-screen">
            <h1 className="text-xl font-bold mb-4 border-b border-green-800 pb-2">Login Debugger</h1>

            <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="border border-green-900 p-4 rounded">
                    <h3 className="font-bold text-white mb-2">Environment</h3>
                    <div>URL: {status.env?.hasUrl ? "✅ Found" : "❌ MISSING"}</div>
                    <div>Key: {status.env?.hasKey ? "✅ Found" : "❌ MISSING"}</div>
                </div>
                <div className="border border-green-900 p-4 rounded">
                    <h3 className="font-bold text-white mb-2">Auth State</h3>
                    <div>Session: {status.session ? "🟢 Active" : "⚪ Guest"}</div>
                </div>
            </div>

            <div className="bg-gray-900 p-4 rounded border border-gray-700 h-96 overflow-y-auto">
                {logs.map((log, i) => (
                    <div key={i} className="mb-1">{log}</div>
                ))}
            </div>

            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
            >
                Run Checks Again
            </button>
        </div>
    );
}
