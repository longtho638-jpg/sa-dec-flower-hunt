"use client";

export default function OfflinePage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-stone-50 p-4">
            <div className="text-center space-y-6 max-w-md">
                {/* Offline Icon */}
                <div className="relative">
                    <div className="w-24 h-24 mx-auto bg-stone-200 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-stone-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m2.829 2.829L17 17m-3.172-5.172a2.5 2.5 0 000 3.536m0 0L12 17m1.828-2.172L12 17m-6 0l-2.828-2.828m0 0a9 9 0 0112.728 0M9 9l3 3m4 4l3 3M3 3l18 18"
                            />
                        </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">!</span>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-stone-900">
                    📵 Mất kết nối
                </h1>

                {/* Description */}
                <p className="text-stone-600 text-lg">
                    Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet và thử lại.
                </p>

                {/* Cached Content Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-medium">💡 Mẹo:</p>
                    <p>Bạn vẫn có thể xem các trang đã truy cập trước đó!</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                    >
                        🔄 Thử lại
                    </button>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full px-6 py-3 bg-white hover:bg-stone-50 text-stone-700 font-medium rounded-lg border border-stone-200 transition-colors"
                    >
                        ← Quay lại
                    </button>
                </div>

                {/* Footer */}
                <p className="text-xs text-stone-400 mt-8">
                    Sa Đéc Flower Hunt - Festival Hoa Xuân 2028
                </p>
            </div>
        </div>
    );
}
