// ============================================================================
// FLASH SALE API - "Giải cứu hoa" Auto-trigger System
// ============================================================================

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { yieldPredictor } from '@/lib/agents/yield-predictor';

// Lazy Supabase client
function getSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key);
}

// GET: Get active flash sales
export async function GET(request: NextRequest) {
    try {
        const supabase = getSupabase();
        if (!supabase) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const searchParams = request.nextUrl.searchParams;
        const action = searchParams.get('action');

        // Generate new flash sales
        if (action === 'generate') {
            const flashSales = await yieldPredictor.generateFlashSales();

            return NextResponse.json({
                success: true,
                count: flashSales.length,
                flashSales,
                generatedAt: new Date().toISOString()
            });
        }

        // Get active flash sales from database
        const { data: sales, error } = await supabase
            .from('flash_sales')
            .select(`
        *,
        inventory (
          flower_name,
          flower_type,
          quantity,
          unit_price,
          garden_id,
          gardens (
            name,
            address
          )
        )
      `)
            .eq('is_active', true)
            .gte('expires_at', new Date().toISOString())
            .order('discount', { ascending: false });

        if (error) {
            // Table might not exist yet - generate from Yield Predictor
            const flashSales = await yieldPredictor.generateFlashSales();
            return NextResponse.json({
                success: true,
                count: flashSales.length,
                flashSales,
                source: 'generated',
                generatedAt: new Date().toISOString()
            });
        }

        return NextResponse.json({
            success: true,
            count: sales?.length || 0,
            flashSales: sales || [],
            source: 'database'
        });

    } catch (error) {
        console.error('Flash sale error:', error);
        return NextResponse.json({ error: 'Failed to get flash sales' }, { status: 500 });
    }
}

// POST: Create or trigger flash sales
export async function POST(request: NextRequest) {
    try {
        const supabase = getSupabase();
        if (!supabase) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const body = await request.json();
        const { action, inventoryId, discount, duration } = body;

        // Auto-trigger: Generate flash sales from Yield Predictor
        if (action === 'auto') {
            const flashSales = await yieldPredictor.generateFlashSales();

            // Save to database (if table exists)
            const insertData = flashSales.map(sale => ({
                inventory_id: null, // Will be matched by flower_type
                flower_type: sale.flowerType,
                garden_id: sale.gardenId,
                original_price: sale.originalPrice,
                sale_price: sale.salePrice,
                discount: sale.discount,
                reason: sale.reason,
                is_active: true,
                expires_at: sale.expiresAt.toISOString(),
                created_at: new Date().toISOString()
            }));

            // Attempt to insert (non-blocking if table doesn't exist)
            try {
                await supabase.from('flash_sales').insert(insertData);
            } catch {
                console.log('flash_sales table not found, using in-memory generation');
            }

            return NextResponse.json({
                success: true,
                message: `Generated ${flashSales.length} flash sales`,
                flashSales
            });
        }

        // Manual: Create single flash sale
        if (action === 'manual' && inventoryId) {
            // Get inventory item
            const { data: inventory, error: invError } = await supabase
                .from('inventory')
                .select('*, gardens(name)')
                .eq('id', inventoryId)
                .single();

            if (invError || !inventory) {
                return NextResponse.json({ error: 'Inventory not found' }, { status: 404 });
            }

            const saleDiscount = discount || 20;
            const saleDuration = duration || 24; // hours
            const originalPrice = inventory.unit_price || 100000;
            const salePrice = Math.round(originalPrice * (1 - saleDiscount / 100));

            const flashSale = {
                inventory_id: inventoryId,
                flower_type: inventory.flower_type,
                garden_id: inventory.garden_id,
                original_price: originalPrice,
                sale_price: salePrice,
                discount: saleDiscount,
                reason: `🔥 Flash Sale: ${inventory.flower_name || inventory.flower_type}! Giảm ${saleDiscount}%`,
                is_active: true,
                expires_at: new Date(Date.now() + saleDuration * 60 * 60 * 1000).toISOString()
            };

            // Try to insert
            try {
                const { data: created, error: createError } = await supabase
                    .from('flash_sales')
                    .insert(flashSale)
                    .select()
                    .single();

                if (createError) throw createError;

                return NextResponse.json({
                    success: true,
                    message: 'Flash sale created',
                    flashSale: created
                });
            } catch {
                // Return the generated sale without saving
                return NextResponse.json({
                    success: true,
                    message: 'Flash sale generated (not saved)',
                    flashSale
                });
            }
        }

        return NextResponse.json(
            { error: 'Invalid action. Use "auto" or "manual"' },
            { status: 400 }
        );

    } catch (error) {
        console.error('Flash sale creation error:', error);
        return NextResponse.json({ error: 'Failed to create flash sale' }, { status: 500 });
    }
}

// DELETE: Deactivate flash sale
export async function DELETE(request: NextRequest) {
    try {
        const supabase = getSupabase();
        if (!supabase) {
            return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
        }

        const searchParams = request.nextUrl.searchParams;
        const saleId = searchParams.get('id');

        if (!saleId) {
            return NextResponse.json({ error: 'Sale ID required' }, { status: 400 });
        }

        const { error } = await supabase
            .from('flash_sales')
            .update({ is_active: false })
            .eq('id', saleId);

        if (error) throw error;

        return NextResponse.json({
            success: true,
            message: 'Flash sale deactivated'
        });

    } catch (error) {
        console.error('Flash sale deletion error:', error);
        return NextResponse.json({ error: 'Failed to deactivate flash sale' }, { status: 500 });
    }
}
