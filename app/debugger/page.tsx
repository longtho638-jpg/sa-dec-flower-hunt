"use client";

import React, { useEffect, useState } from 'react';

export default function DebuggerPage() {
  const [storageData, setStorageData] = useState<string>('Loading...');

  useEffect(() => {
    setStorageData(JSON.stringify(localStorage, null, 2));
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Debugger</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4">System Status</h2>
          <div className="space-y-2 text-sm font-mono">
            <div>App Version: 1.0.0</div>
            <div>React Version: {React.version}</div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500">
          <h2 className="text-xl font-semibold mb-4">Local Storage</h2>
          <div className="max-h-60 overflow-auto bg-gray-100 dark:bg-gray-900 p-4 rounded">
            <pre className="text-xs">
              {storageData}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
