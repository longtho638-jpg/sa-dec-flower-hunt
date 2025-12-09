import Link from 'next/link'

export const metadata = {
    title: 'Privacy Policy | SADEC.OS',
    description: 'Privacy Policy for SADEC.OS flower delivery platform'
}

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-stone-950 py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
                    ← Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-stone-400 mb-8">Last updated: December 9, 2024</p>

                <div className="prose prose-invert prose-emerald max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p className="text-stone-300">
                            We collect information you provide directly, including:
                        </p>
                        <ul className="list-disc pl-6 text-stone-300 space-y-2">
                            <li>Name and contact information (email, phone)</li>
                            <li>Delivery address</li>
                            <li>Payment information (processed securely by our payment partners)</li>
                            <li>TikTok account information (if you connect via TikTok)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                        <p className="text-stone-300">
                            We use your information to:
                        </p>
                        <ul className="list-disc pl-6 text-stone-300 space-y-2">
                            <li>Process and deliver your orders</li>
                            <li>Communicate about your orders</li>
                            <li>Improve our services</li>
                            <li>Post content to TikTok on your behalf (with your permission)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. TikTok Integration</h2>
                        <p className="text-stone-300">
                            If you connect your TikTok account, we may:
                        </p>
                        <ul className="list-disc pl-6 text-stone-300 space-y-2">
                            <li>Access your basic profile information</li>
                            <li>Post videos or photos to your TikTok account (only with explicit consent)</li>
                            <li>View your TikTok privacy settings</li>
                        </ul>
                        <p className="text-stone-300 mt-4">
                            You can revoke TikTok access at any time through your TikTok account settings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Sharing</h2>
                        <p className="text-stone-300">
                            We do not sell your personal information. We may share data with:
                        </p>
                        <ul className="list-disc pl-6 text-stone-300 space-y-2">
                            <li>Delivery partners (to fulfill orders)</li>
                            <li>Payment processors (to process transactions)</li>
                            <li>TikTok (for social media integration)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Data Security</h2>
                        <p className="text-stone-300">
                            We implement appropriate security measures to protect your personal information.
                            However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
                        <p className="text-stone-300">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-stone-300 space-y-2">
                            <li>Access your personal data</li>
                            <li>Request deletion of your data</li>
                            <li>Opt out of marketing communications</li>
                            <li>Disconnect social media accounts</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                        <p className="text-stone-300">
                            For privacy-related questions, contact us at:<br />
                            Email: privacy@sadec.os<br />
                            Address: Sa Dec, Dong Thap, Vietnam
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
