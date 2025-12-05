import { Metadata } from "next";
import { CodePageClient } from "@/components/code/CodePageClient";

export const metadata: Metadata = {
  title: "Code Explorer | Admin",
  description: "View project source code",
};

export default function CodePage() {
  return <CodePageClient />;
}
