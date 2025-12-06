"use client";

import { useEffect, useState } from 'react';

export default function DebugClient() {
    const [storage, setStorage] = useState<any>(null);

    useEffect(() => {
        const cart = localStorage.getItem('sadec-cart-storage');
        const wishlist = localStorage.getItem('sadec_wishlist');
        const scanned = localStorage.getItem('sadec_scanned');

        setStorage({ cart, wishlist, scanned });
    }, []);

    return (
        <div className="p-8 bg-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4">🔍 Client Storage Debug</h1>
            <div className="space-y-4 font-mono text-sm">
                <div className="p-4 bg-stone-100 rounded">
                    <h2 className="font-bold mb-2">Cart Storage:</h2>
                    <pre className="whitespace-pre-wrap break-all">{storage?.cart || 'null'}</pre>
                </div>
                <div className="p-4 bg-stone-100 rounded">
                    <h2 className="font-bold mb-2">Wishlist:</h2>
                    <pre className="whitespace-pre-wrap break-all">{storage?.wishlist || 'null'}</pre>
                </div>
                <div className="p-4 bg-stone-100 rounded">
                    <h2 className="font-bold mb-2">Scanned:</h2>
                    <pre className="whitespace-pre-wrap break-all">{storage?.scanned || 'null'}</pre>
                </div>
                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded font-sans"
                >
                    NUKE ALL & RELOAD
                </button>
            </div>
        </div>
    );
}
