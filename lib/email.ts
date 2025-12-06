import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_SENDER = 'Sa Đéc Flower Hunt <onboarding@resend.dev>'; // Default Resend domain until custom domain verified
export const ADMIN_EMAIL = 'longtho638@gmail.com'; // Replace with actual admin email
