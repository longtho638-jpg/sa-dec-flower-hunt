
import { supabase } from './supabase';

export type AARRRStage = 'acquisition' | 'activation' | 'retention' | 'revenue' | 'referral';

export type AnalyticsEvent = {
    stage: AARRRStage;
    action: string;
    metadata?: Record<string, any>;
};

export const trackEvent = async (stage: AARRRStage, action: string, metadata?: Record<string, any>) => {
    try {
        const { error } = await supabase
            .from('events')
            .insert({
                stage,
                action,
                metadata,
                // user_id will be handled by RLS if user is authenticated, 
                // or we can generate a session ID if needed. For now, keep it simple.
            });

        if (error) {
            console.error('Error tracking event:', error);
        } else {
            console.log(`[AARRR] Tracked: ${stage} - ${action}`, metadata);
        }
    } catch (err) {
        console.error('Exception tracking event:', err);
    }
};
