import { getCurrentUser } from './auth';
import { getUserTickets, type Ticket } from './tickets';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ContextualResponse {
  response: string;
  followUp?: string;
  confidence: number;
}

function getDefaultResponse(): ContextualResponse {
  return {
    response: "I'm here to help! However, I notice you're not logged in. To provide more personalized assistance, please sign in to your account. In the meantime, I can still help with general questions.",
    confidence: 0.9
  };
}

function analyzeMessage(message: string, tickets?: Ticket[]): ContextualResponse {
  const lowerMessage = message.toLowerCase();
  
  // Check for greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/i)) {
    return {
      response: "Hey there! How can I help you today?",
      confidence: 0.9
    };
  }

  // Check for gratitude
  if (lowerMessage.match(/^(thanks|thank you|thx)/i)) {
    return {
      response: "You're welcome! Let me know if you need anything else.",
      confidence: 0.9
    };
  }

  // Check for specific issues
  const issuePatterns = {
    login: {
      pattern: /(login|sign in|cannot access|password)/i,
      response: "I noticed you're having trouble logging in. A few questions to help me understand better:\n\n• Are you getting any specific error messages?\n• Have you recently changed your password?\n• Are you able to access other parts of the system?",
      confidence: 0.8
    },
    performance: {
      pattern: /(slow|lag|freeze|stuck|loading)/i,
      response: "Let's figure out what's causing the performance issues. Could you tell me:\n\n• When did you first notice the slowdown?\n• Does it happen in specific areas of the system?\n• Have you tried clearing your cache or restarting?",
      confidence: 0.8
    },
    error: {
      pattern: /(error|bug|broken|not working|issue|problem)/i,
      response: "I'll help you resolve this. To better assist you:\n\n• Can you describe exactly what happens when the error occurs?\n• What were you trying to do when you encountered it?\n• Has this happened before?",
      confidence: 0.7
    }
  };

  // Find matching issue pattern
  for (const [key, issue] of Object.entries(issuePatterns)) {
    if (lowerMessage.match(issue.pattern)) {
      // Check tickets for context if available
      if (tickets?.length) {
        const relatedTickets = tickets.filter(ticket => 
          ticket.title.toLowerCase().includes(key) || 
          ticket.description.toLowerCase().includes(key)
        );

        if (relatedTickets.length > 0) {
          return {
            response: `I see you've had similar issues before. ${issue.response}`,
            followUp: "I can also check your previous tickets if that would be helpful.",
            confidence: issue.confidence
          };
        }
      }

      return {
        response: issue.response,
        confidence: issue.confidence
      };
    }
  }

  // Default response for unclear queries
  return {
    response: "I want to make sure I understand your situation correctly. Could you provide more details about what you're experiencing?",
    followUp: "For example, what specific part of the system are you having trouble with?",
    confidence: 0.5
  };
}

export async function generateAIResponse(message: string): Promise<string> {
  try {
    // Get user context
    const userResult = await getCurrentUser();
    
    // If user is not authenticated, provide a default response
    if (!userResult.success) {
      const { response, followUp } = getDefaultResponse();
      return followUp ? `${response}\n\n${followUp}` : response;
    }

    // Try to get user's tickets for context, but don't fail if unavailable
    let tickets: Ticket[] = [];
    try {
      const ticketsResult = await getUserTickets();
      if (ticketsResult.success) {
        tickets = ticketsResult.data;
      }
    } catch (error) {
      console.warn('Failed to fetch tickets for AI context:', error);
      // Continue without tickets context
    }
    
    // Analyze message and generate response
    const { response, followUp } = analyzeMessage(message, tickets);
    
    // Add follow-up if available
    return followUp ? `${response}\n\n${followUp}` : response;
  } catch (error) {
    console.error('AI response generation failed:', error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
  }
}