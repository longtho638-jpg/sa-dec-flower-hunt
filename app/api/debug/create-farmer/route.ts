import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client
// note: usage of process.env directly might be an issue if not configured, but we verified keys exist.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);

export async function POST(request: Request) {
    try {
        // Validate environment first
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
            return NextResponse.json({ error: "Missing NEXT_PUBLIC_SUPABASE_URL" }, { status: 500 });
        }
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing SUPABASE_SERVICE_ROLE_KEY - Please add to .env.local" }, { status: 500 });
        }

        const { email, password, name } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Email and Password required" }, { status: 400 });
        }

        // Generate unique email by appending timestamp (avoids cleanup complexity)
        const uniqueEmail = email.replace('@', `+${Date.now()}@`);
        console.log(`[Debug] Creating Farmer with unique email: ${uniqueEmail}`);

        // 0. Cleanup: Delete existing user if exists (using SQL query)
        try {
            // Query auth.users table directly
            const { data: existingUsers, error: queryError } = await supabaseAdmin
                .from('auth.users' as any)
                .select('id')
                .eq('email', email)
                .limit(1);

            if (existingUsers && existingUsers.length > 0) {
                const userId = existingUsers[0].id;
                console.log(`[Debug] Found existing user: ${userId}, deleting...`);

                // Delete profile first (foreign key constraint)
                const { error: profileDeleteError } = await supabaseAdmin
                    .from('profiles')
                    .delete()
                    .eq('id', userId);

                if (profileDeleteError) {
                    console.log('[Debug] Profile delete error:', profileDeleteError.message);
                }

                // Delete auth user
                const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

                if (authDeleteError) {
                    console.log('[Debug] Auth delete error:', authDeleteError.message);
                } else {
                    console.log(`[Debug] Deleted user successfully`);
                }
            } else {
                console.log(`[Debug] No existing user found for ${email}`);
            }
        } catch (cleanupError: any) {
            console.log('[Debug] Cleanup error (will retry creation):', cleanupError.message);
        }

        // 1. Create User (Admin bypassing email confirmation)
        const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email: uniqueEmail,
            password: password,
            email_confirm: true,
            user_metadata: { full_name: name || "Farmer Debug" }
        });

        if (createError) {
            console.error("[Debug] Create User Error:", createError);
            return NextResponse.json({ error: createError.message }, { status: 500 });
        }

        if (!user.user) {
            return NextResponse.json({ error: "User created but null return" }, { status: 500 });
        }

        const userId = user.user.id;
        console.log(`[Debug] User Created ID: ${userId}`);

        // 2. Create/Update Profile
        // We use upsert to be safe
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .upsert({
                id: userId,
                role: 'farmer',
                full_name: name || "Farmer Debug",
                avatar_url: "https://github.com/shadcn.png"
            });

        if (profileError) {
            console.error("[Debug] Profile Error:", profileError);
            return NextResponse.json({ error: "User created but Profile failed: " + profileError.message }, { status: 500 });
        }

        // 3. Create Sample Product (So dashboard isn't empty)
        const { error: productError } = await supabaseAdmin
            .from('products')
            .insert({
                farmer_id: userId,
                name: "Hoa Debug (VIP)",
                price: 999999,
                status: 'active',
                stock_level: 100,
                description: "Sản phẩm test auto-generated"
            });

        // 4. Generate Magic Link (Panic Button Mode)
        const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
            type: 'magiclink',
            email: uniqueEmail
        });

        console.log('[Debug] Magic Link Data:', linkData);
        console.log('[Debug] Magic Link Error:', linkError);

        if (linkError || !linkData.properties?.action_link) {
            console.error("Magic Link Failed:", linkError);
            return NextResponse.json({
                success: true,
                message: "User created but Magic Link failed. Try password login.",
                user: { email: uniqueEmail, id: userId }
            });
        }

        console.log('[Debug] Returning redirectTo:', linkData.properties.action_link);

        return NextResponse.json({
            success: true,
            message: "User created & Magic Link Generated",
            redirectTo: linkData.properties.action_link
        });

    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
