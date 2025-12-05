export function StructuredData() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://sadec-flower-hunt.vercel.app/#organization",
                "name": "Sa Đéc Flower Hunt",
                "url": "https://sadec-flower-hunt.vercel.app",
                "logo": "https://sadec-flower-hunt.vercel.app/icon.png",
                "description": "Nền tảng thương mại điện tử chuyên cung cấp hoa kiểng Sa Đéc chính gốc.",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Làng Hoa Sa Đéc",
                    "addressLocality": "Sa Đéc",
                    "addressRegion": "Đồng Tháp",
                    "postalCode": "870000",
                    "addressCountry": "VN"
                },
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+84-123-456-789",
                    "contactType": "customer service"
                }
            },
            {
                "@type": "Place",
                "@id": "https://sadec-flower-hunt.vercel.app/#place",
                "name": "Làng Hoa Sa Đéc",
                "description": "Thủ phủ hoa kiểng của miền Tây Nam Bộ",
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 10.2925,
                    "longitude": 105.7550
                },
                "hasMap": "https://goo.gl/maps/example"
            },
            {
                "@type": "WebSite",
                "@id": "https://sadec-flower-hunt.vercel.app/#website",
                "url": "https://sadec-flower-hunt.vercel.app",
                "name": "Sa Đéc Flower Hunt",
                "publisher": {
                    "@id": "https://sadec-flower-hunt.vercel.app/#organization"
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
