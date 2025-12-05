import { Metadata } from "next";
import { FLOWERS } from "@/data/flowers";
import FlowerDetailClient from "@/components/flower/FlowerDetailClient";

interface Props {
    params: Promise<{ id: string }>;
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
    // We pass the ID to the client component
    return <FlowerDetailClient id={Number(id)} />;
}
