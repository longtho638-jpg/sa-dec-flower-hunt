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

  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const relativePath = searchParams.get("file");

  if (!relativePath) {
    return NextResponse.json({ error: "File path required" }, { status: 400 });
  }

  // Security: Prevent directory traversal and restrict to project root
  const projectRoot = process.cwd();
  const fullPath = path.join(projectRoot, relativePath);

  if (!fullPath.startsWith(projectRoot)) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  // Extra security: Do not serve .env files
  if (relativePath.includes(".env")) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    // Check if file exists and is a file
    const stat = fs.statSync(fullPath);
    if (!stat.isFile()) {
      return NextResponse.json({ error: "Not a file" }, { status: 400 });
    }

    const content = fs.readFileSync(fullPath, "utf-8");
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 });
  }
}
