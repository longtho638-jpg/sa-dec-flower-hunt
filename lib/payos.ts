import PayOS from '@payos/node';

let payOS: any | null = null;

function initPayOS() {
    const clientId = process.env.PAYOS_CLIENT_ID;
    const apiKey = process.env.PAYOS_API_KEY;
    const checksumKey = process.env.PAYOS_CHECKSUM_KEY;

    if (!clientId || !apiKey || !checksumKey) {
        throw new Error(
            'PayOS credentials missing. Required env vars:\n' +
            '  - PAYOS_CLIENT_ID\n' +
            '  - PAYOS_API_KEY\n' +
            '  - PAYOS_CHECKSUM_KEY'
        );
    }

    // PayOS constructor signature: clientId, apiKey, checksumKey
    payOS = new (PayOS as any)(clientId, apiKey, checksumKey);
    return payOS;
}

// Initialize at module load
try {
    payOS = initPayOS();
    console.log('[PayOS] ✓ Initialized successfully');
} catch (error) {
    console.error('[PayOS] ✗ Initialization failed:', error);
    // Only throw in production strict mode, otherwise warn to allow build
    if (process.env.NODE_ENV === 'production' && !process.env.CI) {
        // Warn but don't crash build, crash runtime if used
    }
}

// Getter with validation
export function getPayOS() {
    if (!payOS) {
        // Try one last time lazy init
        try {
            return initPayOS();
        } catch (e) {
            throw new Error(
                'PayOS not initialized. Check environment variables:\n' +
                'PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY'
            );
        }
    }
    return payOS;
}

export interface PayOSPaymentData {
    orderCode: number;
    amount: number;
    description: string;
    items: any[];
    returnUrl?: string;
    cancelUrl?: string;
    buyerName?: string;
    buyerEmail?: string;
    buyerPhone?: string;
    buyerAddress?: string;
}

// Wrapper types
export interface PayOSWebhookData {
    code: string;
    desc: string;
    data: any;
    signature: string;
    orderCode: number;
    amount: number;
    reference: string;
    transactionDateTime: string;
    currency: string;
    paymentLinkId: string;
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
export async function createPaymentLink(data: PayOSPaymentData) {
    const client = getPayOS();
    try {
        const paymentData = {
            orderCode: data.orderCode,
            amount: data.amount,
            description: data.description,
            buyerName: data.buyerName,
            buyerEmail: data.buyerEmail,
            buyerPhone: data.buyerPhone,
            buyerAddress: data.buyerAddress,
            items: data.items,
            returnUrl: data.returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-result/success`,
            cancelUrl: data.cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/payment-result/failed?reason=cancelled`,
        };

        return await client.createPaymentLink(paymentData);
    } catch (error: any) {
        console.error('PayOS createPaymentLink error:', error);
        throw new Error(error.message || 'Failed to create payment link');
    }
}

/**
 * Verify webhook signature
 */
export function verifyWebhookData(webhookData: PayOSWebhookData): boolean {
    const client = getPayOS();
    try {
        return client.verifyPaymentWebhookData(webhookData);
    } catch (error) {
        console.error('PayOS webhook verification error:', error);
        return false;
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
