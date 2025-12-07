import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Gemini Service - Intelligent Content Generation
 * Hybrid approach: Use Gemini API only for critical thinking tasks
 */

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export class GeminiService {

    /**
     * Generate marketing content using Gemini 2.0 Flash
     */
    static async generateMarketingContent(params: {
        topic: string;
        persona: string;
        goal: string;
        context: string;
    }): Promise<string> {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

            const prompt = `You are a marketing content expert for Sa Dec Flower Hunt, an AgriTech e-commerce platform.

Topic: ${params.topic}
Target Persona: ${params.persona}
Goal: ${params.goal}
Context: ${params.context}

Generate a compelling, authentic piece of content (300-500 words) that:
1. Highlights the beauty and cultural heritage of Sa Dec flowers
2. Connects emotionally with the target persona
3. Includes a clear call-to-action
4. Uses storytelling, not corporate speak

Output in Vietnamese (informal, friendly tone).`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            return response.text();

        } catch (error) {
            console.error('Gemini API Error:', error);
            // Fallback to template if API fails
            return `[Template] ${params.topic} - ${params.context}`;
        }
    }

    /**
     * Generate sales strategy using Gemini
     */
    static async generateSalesStrategy(params: {
        targetMarket: string;
        productType: string;
        challenges: string;
        goals: string;
    }): Promise<any> {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

            const prompt = `You are a B2B/B2C sales strategist for an AgriTech flower marketplace.

Target Market: ${params.targetMarket}
Product: ${params.productType}
Challenges: ${params.challenges}
Goals: ${params.goals}

Generate a detailed sales strategy in JSON format with these keys:
{
  "prospecting_channels": ["channel1", "channel2"],
  "key_message": "main value proposition",
  "objection_handling": [{"objection": "...", "response": "..."}],
  "suggested_tactics": ["tactic1", "tactic2"],
  "estimated_conversion_rate": "X%"
}

Be specific to Vietnam market and flower industry. Return ONLY valid JSON.`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            // Try to parse as JSON
            try {
                return JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
            } catch {
                return { raw_output: text };
            }

        } catch (error) {
            console.error('Gemini API Error:', error);
            return { error: 'API failed', fallback: true };
        }
    }

    /**
     * Make strategic decision using Gemini reasoning
     */
    static async makeStrategicDecision(params: {
        goals: any[];
        currentMetrics: any;
        recentActions: string[];
    }): Promise<{
        directive: string;
        departments: string[];
        reasoning: string;
    }> {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

            const prompt = `You are the CEO of Sa Dec Flower Hunt. Analyze the situation and make a strategic decision.

GOALS:
${JSON.stringify(params.goals, null, 2)}

CURRENT METRICS:
${JSON.stringify(params.currentMetrics, null, 2)}

RECENT ACTIONS:
${params.recentActions.join('\n')}

Based on this data, decide which department(s) to activate today and why.

Return JSON:
{
  "directive": "clear instruction for today",
  "departments": ["Marketing", "Sales", "Finance"],
  "reasoning": "why this decision makes sense"
}

Be decisive and strategic. Return ONLY valid JSON.`;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            try {
                return JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
            } catch {
                // Fallback to simple logic
                return {
                    directive: "Continue growth momentum",
                    departments: ["Marketing"],
                    reasoning: "API parsing failed, using fallback"
                };
            }

        } catch (error) {
            console.error('Gemini API Error:', error);
            return {
                directive: "Maintain operations",
                departments: ["Marketing"],
                reasoning: "API failed, using safe fallback"
            };
        }
    }
    /**
     * Generate content from image using Gemini Vision capabilities
     */
    static async generateFromImage(params: {
        imageBase64: string;
        mimeType: string;
        prompt: string;
    }): Promise<any> {
        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

            const result = await model.generateContent([
                params.prompt,
                {
                    inlineData: {
                        data: params.imageBase64,
                        mimeType: params.mimeType,
                    },
                },
            ]);

            const response = result.response;
            const text = response.text();

            try {
                return JSON.parse(text.replace(/```json\n?/g, '').replace(/```\n?/g, ''));
            } catch {
                return {
                    description: text,
                    raw_output: true
                };
            }

        } catch (error) {
            console.error('Gemini Vision API Error:', error);
            // Return structured error for UI handling
            return {
                error: true,
                message: "Không thể phân tích ảnh lúc này. Vui lòng thử lại sau.",
                fallback_description: "Hoa đẹp rực rỡ, thích hợp chưng Tết."
            };
        }
    }
}
