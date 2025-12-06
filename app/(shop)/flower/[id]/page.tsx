import { Metadata } from "next";
import { FLOWERS } from "@/data/flowers";
import FlowerDetailClient from "@/components/flower/FlowerDetailClient";

interface Props {
    params: Promise<{ id: string }>;
}

// Generate static params for the top known flowers to pre-build pages (SSG)
export async function generateStaticParams() {
    // In a real app, fetch this from DB
    return FLOWERS.map((flower) => ({
        id: String(flower.id),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const flowerId = Number(id);
    const flower = FLOWERS.find((f) => f.id === flowerId);

    if (!flower) {
        return {
            title: "Không tìm thấy hoa",
        };
    }

    return {
        title: `${flower.name} | Sa Đéc Flower Hunt`,
        description: flower.salesPitch,
        openGraph: {
            title: flower.name,
            description: flower.salesPitch,
            images: [flower.image],
        },
    };
}

// This is a Server Component
export default async function FlowerPage({ params }: Props) {
    const { id } = await params;
    const flowerId = Number(id);
    const flower = FLOWERS.find((f) => f.id === flowerId);

    if (!flower) {
        return <FlowerDetailClient id={Number(id)} />;
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: flower.name,
        image: flower.image,
        description: flower.salesPitch,
        brand: {
            '@type': 'Brand',
            name: 'Sa Đéc Flower Hunt',
        },
        offers: {
            '@type': 'Offer',
            url: `https://sadec-flower-hunt.vercel.app/flower/${flower.id}`,
            priceCurrency: 'VND',
            price: flower.basePrice,
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FlowerDetailClient id={Number(id)} />
        </>
    );
}
