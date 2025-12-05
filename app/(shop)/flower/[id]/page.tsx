import { Metadata } from "next";
import { FLOWERS } from "@/data/flowers";
import FlowerDetailClient from "@/components/flower/FlowerDetailClient";

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const flowerId = Number(params.id);
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
export default function FlowerPage({ params }: Props) {
    // We pass the ID to the client component
    // Note: In Next.js 15+, params is a Promise, but for now assuming 14 or standard usage
    return <FlowerDetailClient id={Number(params.id)} />;
}
