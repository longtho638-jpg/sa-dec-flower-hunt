import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookData, isSuccessPayment, getPayOSMessage, type PayOSWebhookData } from '@/lib/payos';
import { createClient } from '@supabase/supabase-js';

// Use service role for server-side operations
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    try {
        const webhookData: PayOSWebhookData = await request.json();

        console.log('PayOS webhook received:', webhookData);

        // 1. Verify webhook signature
        const isValid = verifyWebhookData(webhookData);
        if (!isValid) {
            console.error('Invalid PayOS webhook signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // 2. Get transaction by orderCode
        const { data: transaction, error: txError } = await supabase
            .from('transactions')
            .select('*, orders(*)')
            .eq('payos_order_code', webhookData.orderCode)
            .single();

        if (txError || !transaction) {
            console.error('Transaction not found:', webhookData.orderCode);
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        const orderId = transaction.order_id;
        const isSuccess = isSuccessPayment(webhookData.code);

        // 3. Update transaction status
        await supabase
            .from('transactions')
            .update({
                status: isSuccess ? 'completed' : 'failed',
                payos_response_code: webhookData.code,
                payos_response_message: getPayOSMessage(webhookData.code),
                payos_transaction_datetime: webhookData.transactionDateTime,
                payos_reference: webhookData.reference,
                updated_at: new Date().toISOString(),
            })
            .eq('id', transaction.id);

        // 4. If successful, process the order
        if (isSuccess) {
            // Update order status
            await supabase
                .from('orders')
                .update({ status: 'paid' })
                .eq('id', orderId);

            // Credit farmer wallet
            const { data: order } = await supabase
                .from('orders')
                .select('*, order_items(farmer_id, price, quantity)')
                .eq('id', orderId)
                .single();

            if (order && order.order_items && order.order_items.length > 0) {
                const amount = webhookData.amount;
                const platformCommission = amount * 0.03; // 3%
                const farmerAmount = amount - platformCommission;

                // Get farmer_id
                const farmerId = order.order_items[0].farmer_id;

                if (farmerId) {
                    // Update or create farmer wallet
                    const { data: wallet } = await supabase
                        .from('farmer_wallets')
                        .select('*')
                        .eq('farmer_id', farmerId)
                        .single();

                    if (wallet) {
                        await supabase
                            .from('farmer_wallets')
                            .update({
                                balance: wallet.balance + farmerAmount,
                                total_earned: wallet.total_earned + farmerAmount,
                            })
                            .eq('farmer_id', farmerId);
                    } else {
                        await supabase
                            .from('farmer_wallets')
                            .insert({
                                farmer_id: farmerId,
                                balance: farmerAmount,
                                total_earned: farmerAmount,
                            });
                    }

                    // Log wallet transaction
                    await supabase
                        .from('wallet_transactions')
                        .insert({
                            farmer_id: farmerId,
                            type: 'credit',
                            amount: farmerAmount,
                            description: `Thanh toán đơn hàng #${orderId.substring(0, 8)}`,
                            order_id: orderId,
                        });

                    console.log(`✅ PayOS: Credited ${farmerAmount} VND to farmer ${farmerId}`);
                }
            }
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('PayOS webhook error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
