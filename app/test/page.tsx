import React from 'react';

export default function TestPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test Page</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <p className="mb-4">This is the diagnostic test page for the Flower Hunt application.</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="font-medium">Environment:</span>
            <span className="font-mono text-sm">{process.env.NODE_ENV}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
            <span className="font-medium">Timestamp:</span>
            <span className="font-mono text-sm">{new Date().toISOString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
