import { NextResponse } from "next/server";
import { parseCommand, executeCommand } from "@/lib/gemini-ops";

export async function POST(req: Request) {
    try {
        const { command } = await req.json();

        if (!command) {
            return NextResponse.json({ error: "Missing command" }, { status: 400 });
        }

        // Step 1: Parse the command using Gemini
        const parsed = await parseCommand(command);

        // Step 2: Execute the parsed action
        const result = await executeCommand(parsed);

        return NextResponse.json({
            success: true,
            parsed,
            result,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Ops API Error:", error);
        return NextResponse.json(
            { error: "Ops Agent gặp lỗi, thử lại sau!" },
            { status: 500 }
        );
    }
}
