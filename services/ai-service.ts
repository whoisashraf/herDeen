import { Task } from '@/contexts/planner-context';
import { OpenRouter } from '@openrouter/sdk';

const OPENROUTER_API_KEY = process.env.EXPO_PUBLIC_OPENROUTER_API_KEY;
const APP_URL = process.env.EXPO_PUBLIC_APP_URL || 'https://herdeen.app';
const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME || 'HerDeen';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export class AIService {
  private conversationHistory: ChatMessage[] = [];
  private openRouter: OpenRouter;

  constructor() {
    if (!OPENROUTER_API_KEY) {
      console.warn(
        'OpenRouter API key not configured. AI features will not work. Please add EXPO_PUBLIC_OPENROUTER_API_KEY to your .env file'
      );
    }

    this.openRouter = new OpenRouter({
      apiKey: OPENROUTER_API_KEY || 'dummy_key',
    });

    // System prompt to guide the AI
    this.conversationHistory = [
      {
        role: 'system',
        content: `You are a helpful Islamic day planner assistant. Help users plan their day with balance between:
- Religious obligations (5 daily prayers, Quran recitation, dhikr)
- Work and productivity
- Self-care and rest
- Family time

IMPORTANT: During conversation, ONLY provide friendly advice and ask clarifying questions. DO NOT include JSON in your responses.
When specifically asked to generate tasks, you will receive a separate request for that.

Be warm, supportive, and use Islamic greetings. Ask about:
- What tasks they need to accomplish
- Their prayer times
- Any time constraints
- Their priorities for the day`,
      },
    ];
  }

  async sendMessage(userMessage: string): Promise<string> {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is missing. Please check your .env file.');
    }

    // Add user message to history
    this.conversationHistory.push({
      role: 'user',
      content: userMessage,
    });

    try {
      const completion = await this.openRouter.chat.send({
        model: 'openai/gpt-4o-mini', // You can change to other models like 'anthropic/claude-3-haiku'
        messages: this.conversationHistory as any,
        temperature: 0.7,
        maxTokens: 500,
      });

      const messageContent = completion.choices[0].message.content;
      const assistantMessage =
        typeof messageContent === 'string' ? messageContent : JSON.stringify(messageContent);

      // Add assistant response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage,
      });

      return assistantMessage;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async generateTasks(): Promise<Task[]> {
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key is missing. Please check your .env file.');
    }

    // Create a separate request for task generation (not part of chat history)
    const taskGenerationPrompt = {
      role: 'user' as const,
      content: `Based on our conversation, generate a structured day plan.

CRITICAL: Return ONLY a raw JSON array. No text before or after. No markdown code blocks. No explanations.

Start your response with [ and end with ]

Format each task exactly like this:
[
  {
    "title": "Task name",
    "description": "Brief description",
    "priority": "high",
    "estimatedDuration": 30,
    "preferredTime": "09:00"
  }
]

Include all 5 daily prayers as high priority tasks with appropriate times.`,
    };

    try {
      // Make a direct API call without adding to conversation history
      const completion = await this.openRouter.chat.send({
        model: 'openai/gpt-4o-mini',
        messages: [...this.conversationHistory, taskGenerationPrompt] as any,
        temperature: 0.3, // Lower temperature for more consistent JSON
        maxTokens: 1000,
      });

      const messageContent = completion.choices[0].message.content;
      const response = typeof messageContent === 'string' ? messageContent : JSON.stringify(messageContent);

      // Extract JSON from response (AI might wrap it in markdown code blocks)
      let jsonMatch = response.match(/\[[\s\S]*\]/);
      
      // If no match, try to find JSON in code blocks
      if (!jsonMatch) {
        const codeBlockMatch = response.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
        if (codeBlockMatch) {
          jsonMatch = [codeBlockMatch[1]];
        }
      }

      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      const tasks = JSON.parse(jsonMatch[0]);

      // Convert to Task format with IDs
      return tasks.map((task: any, index: number) => ({
        id: `${Date.now()}-${index}`,
        title: task.title,
        description: task.description,
        priority: task.priority || 'medium',
        estimatedDuration: task.estimatedDuration || 30,
        preferredTime: task.preferredTime || '09:00',
      }));
    } catch (error) {
      console.error('Failed to parse AI tasks:', error);
      throw new Error('Failed to generate tasks from AI response. Please try again.');
    }
  }

  resetConversation() {
    this.conversationHistory = this.conversationHistory.slice(0, 1); // Keep only system message
  }
}

// Singleton instance
export const aiService = new AIService();
