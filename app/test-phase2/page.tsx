"use client";

import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { FarmerRatingSummary } from "@/components/reviews/FarmerRatingSummary";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ShareButton } from "@/components/marketing/ShareButton";
import { QRCodeDisplay } from "@/components/marketing/QRCodeDisplay";

// Test IDs (use real IDs from your database after creating test data)
const TEST_ORDER_ID = "00000000-0000-0000-0000-000000000100";
const TEST_FARMER_ID = "00000000-0000-0000-0000-000000000001";

export default function TestPhase2Page() {
    return (
        <div className="min-h-screen bg-black text-white p-8 space-y-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 border-2 border-emerald-500 p-6 rounded">
                    <h1 className="text-3xl font-bold text-emerald-500 mb-2">🧪 Phase 2 Component Testing</h1>
                    <p className="text-stone-400">
                        Testing all Trust & Safety + Marketing components
                    </p>
                    <p className="text-xs text-stone-600 mt-2">
                        Update TEST_ORDER_ID and TEST_FARMER_ID in page.tsx with real IDs
                    </p>
                </div>

                {/* Test 1: Order Timeline */}
                <section className="border border-stone-800 p-6 rounded bg-stone-950">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">📍</span>
                        <h2 className="text-xl font-bold text-cyan-400">1. Order Timeline</h2>
                    </div>
                    <div className="bg-stone-900 p-4 rounded">
                        <OrderTimeline orderId={TEST_ORDER_ID} />
                    </div>
                </section>

                {/* Test 2: Review Form */}
                <section className="border border-stone-800 p-6 rounded bg-stone-950">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">⭐</span>
                        <h2 className="text-xl font-bold text-cyan-400">2. Review Form</h2>
                    </div>
                    <div className="bg-stone-900 p-4 rounded">
                        <ReviewForm
                            orderId={TEST_ORDER_ID}
                            buyerId="test-buyer-id"
                            onSuccess={() => alert('Review submitted successfully!')}
                        />
                    </div>
                </section>

                {/* Test 3: Farmer Rating Summary */}
                <section className="border border-stone-800 p-6 rounded bg-stone-950">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">📊</span>
                        <h2 className="text-xl font-bold text-cyan-400">3. Farmer Rating Summary</h2>
                    </div>
                    <div className="bg-stone-900 p-4 rounded">
                        <FarmerRatingSummary farmerId={TEST_FARMER_ID} />
                    </div>
                </section>

                {/* Test 4: Review List */}
                <section className="border border-stone-800 p-6 rounded bg-stone-950">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">💬</span>
                        <h2 className="text-xl font-bold text-cyan-400">4. Review List</h2>
                    </div>
                    <div className="bg-stone-900 p-4 rounded">
                        <ReviewList farmerId={TEST_FARMER_ID} limit={5} />
                    </div>
                </section>

                {/* Test 5: Share Button */}
                <section className="border border-stone-800 p-6 rounded bg-stone-950">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">🔗</span>
                        <h2 className="text-xl font-bold text-cyan-400">5. Share Button</h2>
                    </div>
                    <div className="bg-stone-900 p-4 rounded flex items-center gap-4">
                        <ShareButton
                            url="http://localhost:3000/test-phase2"
                            title="Phase 2 Testing Page"
                            description="Testing share functionality for SADEC.OS"
                        />
                        <span className="text-sm text-stone-500">← Click to test share menu</span>
                    </div>
                </section>

                {/* Test 6: QR Code Display */}
                <section className="border border-stone-800 p-6 rounded bg-stone-950">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl">📱</span>
                        <h2 className="text-xl font-bold text-cyan-400">6. QR Code Display</h2>
                    </div>
                    <div className="bg-stone-900 p-4 rounded">
                        <QRCodeDisplay farmerId={TEST_FARMER_ID} />
                    </div>
                </section>

                {/* Testing Checklist */}
                <section className="border-2 border-amber-500/30 p-6 rounded bg-amber-950/20 mt-12">
                    <h3 className="text-xl font-bold text-amber-400 mb-4">✅ Visual Checklist</h3>
                    <div className="space-y-2 text-sm">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>OrderTimeline shows vertical timeline with icons</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>Current status is highlighted</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>ReviewForm has 5 clickable stars</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>Star rating changes on hover/click</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>FarmerRatingSummary shows rating distribution</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>ReviewList displays reviews with proper formatting</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>ShareButton opens dropdown menu</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>Facebook/Zalo/Copy options visible</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>QRCodeDisplay shows QR image</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>Download and Print buttons work</span>
                        </label>
                    </div>
                </section>

                <div className="text-center py-8">
                    <p className="text-stone-500 text-sm">
                        All checks passed? Phase 2 ready for beta launch! 🚀
                    </p>
                </div>
            </div>
        </div>
    );
}
