import Link from 'next/link'

export const metadata = {
    title: 'Terms of Service | SADEC.OS',
    description: 'Terms of Service for SADEC.OS flower delivery platform'
}

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-stone-950 py-20 px-6">
            <div className="max-w-3xl mx-auto">
                <Link href="/" className="text-emerald-400 hover:text-emerald-300 mb-8 inline-block">
                    ← Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-stone-400 mb-8">Last updated: December 9, 2024</p>

                <div className="prose prose-invert prose-emerald max-w-none space-y-6">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p className="text-stone-300">
                            By accessing and using SADEC.OS (&quot;the Service&quot;), you accept and agree to be bound by these
                            Terms of Service. If you do not agree to these terms, please do not use our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
                        <p className="text-stone-300">
                            SADEC.OS is a platform connecting customers with flower farmers in Sa Dec, Vietnam.
                            We provide fresh flower delivery services with cold-chain logistics.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
                        <p className="text-stone-300">
                            You may be required to create an account to use certain features. You are responsible
                            for maintaining the confidentiality of your account credentials.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Orders and Payments</h2>
                        <p className="text-stone-300">
                            All orders are subject to availability. Prices are displayed in Vietnamese Dong (VND).
                            Payment is processed securely through our payment partners.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Delivery</h2>
                        <p className="text-stone-300">
                            We aim to deliver within 6 hours of order confirmation. Delivery times may vary based
                            on location and availability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Refunds and Returns</h2>
                        <p className="text-stone-300">
                            Due to the perishable nature of flowers, refunds are handled on a case-by-case basis.
                            Please contact us within 24 hours of delivery if you have concerns.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Social Media Integration</h2>
                        <p className="text-stone-300">
                            Our Service may integrate with TikTok and other social media platforms. By using these
                            features, you also agree to the respective platform&apos;s terms of service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Contact</h2>
                        <p className="text-stone-300">
                            For questions about these Terms, please contact us at:<br />
                            Email: hello@sadec.os<br />
                            Address: Sa Dec, Dong Thap, Vietnam
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
