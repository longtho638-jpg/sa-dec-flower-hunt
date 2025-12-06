import { Resend } from 'resend';

// Use the provided key as fallback so it works immediately without Vercel Env config
export const resend = new Resend(process.env.RESEND_API_KEY || 're_jGhLHfxJ_qjjkVXDT3cR4d6JDQSqujv1t');

export const EMAIL_SENDER = 'Sa Đéc Flower Hunt <onboarding@resend.dev>'; // Default Resend domain until custom domain verified
export const ADMIN_EMAIL = 'longtho638@gmail.com'; // Replace with actual admin email
