import PayOS from "@payos/node";

/**
 * PayOS Payment Gateway Integration
 * Simpler, faster, cheaper alternative to VNPay
 */

// PayOS Configuration
const PAYOS_CLIENT_ID = process.env.PAYOS_CLIENT_ID || '';
const PAYOS_API_KEY = process.env.PAYOS_API_KEY || '';
const PAYOS_CHECKSUM_KEY = process.env.PAYOS_CHECKSUM_KEY || '';

// Instantiate PayOS client
let payOS: any;
try {
    payOS = new (PayOS as any)(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
} catch (error) {
    console.warn('PayOS initialization warning:', error);
    payOS = null;
}

export interface PayOSPaymentData {
    orderCode: number; // Unique order code (timestamp recommended)
    amount: number; // Total amount in VND
    description: string; // Order description
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    buyerAddress?: string;
    items?: Array<{
        name: string;
        quantity: number;
        price: number;
    }>;
    returnUrl?: string; // URL to redirect after payment
    cancelUrl?: string; // URL to redirect if cancelled
}

export interface PayOSWebhookData {
    orderCode: number;
    amount: number;
    description: string;
    accountNumber: string;
    reference: string;
    transactionDateTime: string;
    currency: string;
    paymentLinkId: string;
    code: string; // '00' = success
    desc: string;
    counterAccountBankId?: string;
    counterAccountBankName?: string;
    counterAccountName?: string;
    counterAccountNumber?: string;
    virtualAccountName?: string;
    virtualAccountNumber?: string;
}

/**
 * Create payment link
 */
export async function createPaymentLink(data: PayOSPaymentData): Promise<{
    checkoutUrl: string;
    paymentLinkId: string;
    orderCode: number;
}> {
    try {
        const paymentData = {
            orderCode: data.orderCode,
            amount: data.amount,
            description: data.description,
            buyerName: data.buyerName,
            buyerEmail: data.buyerEmail,
            buyerPhone: data.buyerPhone,
            buyerAddress: data.buyerAddress,
            items: data.items || [{
                name: data.description,
                quantity: 1,
                price: data.amount
            }],
            returnUrl: data.returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-result/success`,
            cancelUrl: data.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-result/failed?reason=cancelled`,
        };

        const response = await payOS.createPaymentLink(paymentData);

        return {
            checkoutUrl: response.checkoutUrl,
            paymentLinkId: response.paymentLinkId,
            orderCode: response.orderCode,
        };
    } catch (error: any) {
        console.error('PayOS createPaymentLink error:', error);
        throw new Error(error.message || 'Failed to create payment link');
    }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookData(webhookData: PayOSWebhookData): boolean {
    try {
        return payOS.verifyPaymentWebhookData(webhookData);
    } catch (error) {
        console.error('PayOS webhook verification error:', error);
        return false;
    }
}

/**
 * Get payment information
 */
export async function getPaymentInfo(orderCode: number) {
    try {
        return await payOS.getPaymentLinkInformation(orderCode);
    } catch (error: any) {
        console.error('PayOS getPaymentInfo error:', error);
        throw new Error(error.message || 'Failed to get payment info');
    }
}

/**
 * Cancel payment link
 */
export async function cancelPaymentLink(orderCode: number, reason?: string) {
    try {
        return await payOS.cancelPaymentLink(orderCode, reason);
    } catch (error: any) {
        console.error('PayOS cancelPaymentLink error:', error);
        throw new Error(error.message || 'Failed to cancel payment');
    }
}

/**
 * Check if payment was successful
 */
export function isSuccessPayment(code: string): boolean {
    return code === '00';
}

/**
 * Get response message by code
 */
export function getPayOSMessage(code: string): string {
    const messages: Record<string, string> = {
        '00': 'Giao dịch thành công',
        '01': 'Giao dịch đang xử lý',
        '02': 'Giao dịch bị từ chối',
        '03': 'Giao dịch bị hủy',
        '04': 'Giao dịch thất bại',
    };
    return messages[code] || 'Lỗi không xác định';
}

/**
 * Generate unique order code (required by PayOS)
 */
export function generateOrderCode(): number {
    return Math.floor(Date.now() / 1000); // Unix timestamp
}

/**
 * Example usage:
 * 
 * // Create payment
 * const { checkoutUrl } = await createPaymentLink({
 *   orderCode: generateOrderCode(),
 *   amount: 100000,
 *   description: 'Thanh toán đơn hàng #123',
 *   buyerName: 'Nguyen Van A',
 *   buyerEmail: 'user@example.com',
 *   buyerPhone: '0901234567',
 * });
 * 
 * // Verify webhook
 * const isValid = verifyWebhookData(webhookData);
 */
