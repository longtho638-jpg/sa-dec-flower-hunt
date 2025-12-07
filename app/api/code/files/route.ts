import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  // Security Check: Verify Auth Token
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const relativePath = searchParams.get("path") || "";

  // Security: Prevent directory traversal and restrict to project root
  const projectRoot = process.cwd();
  const fullPath = path.join(projectRoot, relativePath);

  if (!fullPath.startsWith(projectRoot)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const entries = fs.readdirSync(fullPath, { withFileTypes: true });

    const files = entries
      .filter((entry) => {
        const name = entry.name;
        // Filter out sensitive or large directories/files
        if (name.startsWith(".")) return false; // hidden files
        if (name === "node_modules") return false;
        if (name === ".git") return false;
        if (name === ".env") return false;
        if (name === ".env.local") return false;
        return true;
      })
      .map((entry) => {
        return {
          name: entry.name,
          type: entry.isDirectory() ? "dir" : "file",
          path: path.join(relativePath, entry.name),
        };
      })
      .sort((a, b) => {
        // Sort directories first, then files
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === "dir" ? -1 : 1;
      });

    return NextResponse.json({ files });
  } catch (error) {
    console.error("Error reading directory:", error);
    return NextResponse.json({ error: "Failed to read directory" }, { status: 500 });
  }
}
