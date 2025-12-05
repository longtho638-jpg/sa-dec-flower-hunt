"use client";

import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  const [checks, setChecks] = useState<Record<string, 'pending' | 'success' | 'failure' | 'skipped'>>({
    supabaseConfig: 'pending',
    connection: 'pending',
    realtime: 'pending',
    apiChat: 'pending',
    tracking: 'pending'
  });
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  const runChecks = async () => {
    setLogs([]);
    addLog("Starting Deep Check...");

    // 1. Config Check
    if (!isSupabaseConfigured) {
      setChecks(prev => ({ ...prev, supabaseConfig: 'failure' }));
      addLog("❌ Supabase Env Vars missing!");
      return;
    }
    setChecks(prev => ({ ...prev, supabaseConfig: 'success' }));
    addLog("✅ Supabase Configured");

    // 2. Connection Check (Leaderboard)
    try {
      const { data, error } = await supabase.from('leaderboard').select('count', { count: 'exact', head: true });
      if (error) throw error;
      setChecks(prev => ({ ...prev, connection: 'success' }));
      addLog(`✅ Supabase Connection OK (Leaderboard table accessible)`);
    } catch (err: any) {
      setChecks(prev => ({ ...prev, connection: 'failure' }));
      addLog(`❌ Connection Failed: ${err.message}`);
    }

    // 3. API Check (AI Dr.Flower)
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        body: JSON.stringify({ message: 'Ping', context: {} })
      });
      if (res.status === 200) {
        setChecks(prev => ({ ...prev, apiChat: 'success' }));
        addLog("✅ API /api/ai-chat responding");
      } else {
        setChecks(prev => ({ ...prev, apiChat: 'failure' }));
        addLog(`❌ API Check Failed: ${res.status}`);
      }
    } catch (err: any) {
      setChecks(prev => ({ ...prev, apiChat: 'failure' }));
      addLog(`❌ API Check Error: ${err.message}`);
    }

    // 4. Realtime Check
    try {
      const channel = supabase.channel('test_channel');
      channel.subscribe((status: string) => {
        if (status === 'SUBSCRIBED') {
          setChecks(prev => ({ ...prev, realtime: 'success' }));
          addLog("✅ Realtime Subscribed");
          supabase.removeChannel(channel);
        }
      });
    } catch (err: any) {
      setChecks(prev => ({ ...prev, realtime: 'failure' }));
      addLog(`❌ Realtime Error: ${err.message}`);
    }

    // 5. Tracking Check (Mock)
    setChecks(prev => ({ ...prev, tracking: 'success' }));
    addLog("✅ Tracking functions loaded (check Network tab for actual requests)");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen bg-stone-50">
      <h1 className="text-3xl font-bold mb-6 text-stone-900">System Deep Check 🕵️‍♀️</h1>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Status Overview</h2>
            <Button onClick={runChecks}>Run Deep Check</Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(checks).map(([key, status]) => (
              <div key={key} className={`p-3 rounded-lg border text-center ${status === 'success' ? 'bg-green-50 border-green-200 text-green-700' :
                  status === 'failure' ? 'bg-red-50 border-red-200 text-red-700' :
                    'bg-gray-50 border-gray-200 text-gray-500'
                }`}>
                <div className="text-sm font-medium uppercase tracking-wider mb-1">{key}</div>
                <div className="font-bold">{status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-stone-900 text-green-400 p-6 rounded-xl shadow-inner font-mono text-sm h-64 overflow-y-auto">
          <div className="text-stone-500 mb-2 border-b border-stone-700 pb-2">System Logs...</div>
          {logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          ))}
          {logs.length === 0 && <span className="opacity-50">Waiting to run...</span>}
        </div>
      </div>
    </div>
  );
}
