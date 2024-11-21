import { Ticket } from './tickets';

export interface AISuggestion {
  solution: string;
  confidence: number;
  needsHumanReview: boolean;
}

export async function analyzeTicket(ticket: Ticket): Promise<AISuggestion> {
  try {
    // In a real implementation, this would call an AI service
    // For now, we'll simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple keyword-based analysis for demonstration
    const keywords = {
      login: {
        solution: "Try these steps:\n1. Clear browser cache and cookies\n2. Try incognito mode\n3. Reset password if needed\n4. Check if the service is down",
        confidence: 0.85
      },
      error: {
        solution: "Common error troubleshooting:\n1. Check error message details\n2. Verify system requirements\n3. Update your browser/app\n4. Contact support if persists",
        confidence: 0.75
      },
      // Add more patterns as needed
    };

    const description = ticket.description.toLowerCase();
    let bestMatch = {
      solution: "I apologize, but I need more information to provide a specific solution. Please provide:\n1. Steps to reproduce the issue\n2. Any error messages\n3. When the issue started",
      confidence: 0.3,
      needsHumanReview: true
    };

    // Find the best matching solution
    for (const [keyword, response] of Object.entries(keywords)) {
      if (description.includes(keyword) && response.confidence > bestMatch.confidence) {
        bestMatch = {
          ...response,
          needsHumanReview: response.confidence < 0.8
        };
      }
    }

    return bestMatch;
  } catch (error) {
    console.error('AI analysis failed:', error);
    throw error;
  }
}