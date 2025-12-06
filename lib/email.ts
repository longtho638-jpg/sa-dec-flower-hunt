import { Resend } from 'resend';

// Use a placeholder during build/dev if key is missing to prevent crash
export const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export const EMAIL_SENDER = 'Sa Đéc Flower Hunt <onboarding@resend.dev>'; // Default Resend domain until custom domain verified
export const ADMIN_EMAIL = 'longtho638@gmail.com'; // Replace with actual admin email
