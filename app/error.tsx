"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Page Error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-stone-50 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong!</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100 max-w-2xl w-full text-left overflow-auto mb-6">
                <p className="font-mono text-sm text-red-500 break-words whitespace-pre-wrap">
                    {error.message}
                </p>
                {error.stack && (
                    <details className="mt-4">
                        <summary className="cursor-pointer text-xs text-stone-400">Stack Trace</summary>
                        <pre className="mt-2 text-xs text-stone-500 overflow-auto max-h-64">
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
            <Button onClick={() => reset()} variant="outline">
                Try again
            </Button>
        </div>
    );
}
