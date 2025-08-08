import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, sessionId, userType = 'visitor' } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Message is required and must be a string' 
        },
        { status: 400 }
      );
    }

    // Simulate chat response logic
    const chatResponse = {
      id: `msg_${Date.now()}`,
      sessionId: sessionId || `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      userMessage: message,
      botResponse: generateChatResponse(message),
      userType,
      status: 'success'
    };

    return NextResponse.json(chatResponse, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to process chat message',
        error: process.env.NODE_ENV === 'development' ? error : 'Internal server error'
      }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      status: 'success',
      message: 'Chat API is running',
      endpoints: {
        POST: 'Send a chat message',
        supportedParams: ['message', 'sessionId', 'userType']
      },
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}

function generateChatResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Simple keyword-based responses for demo
  if (lowerMessage.includes('submit') || lowerMessage.includes('submission')) {
    return "To submit your manuscript, please visit our submission portal or check our Author Guidelines section. Our submission process typically takes 4-6 weeks for peer review.";
  }
  
  if (lowerMessage.includes('review') || lowerMessage.includes('peer')) {
    return "We use a double-blind peer review process. The typical review time is 4-6 weeks, and we maintain high academic standards with expert reviewers in your field.";
  }
  
  if (lowerMessage.includes('publish') || lowerMessage.includes('publication')) {
    return "SR Publishing House offers open access publishing across 8+ journals. We support authors through the entire publication process with professional editing services.";
  }
  
  if (lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('price')) {
    return "We offer competitive publication fees with various support options. Please contact our editorial team for specific pricing information based on your manuscript type.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "We're here to help! You can reach us at authors@srpublishinghouse.com or check our FAQ section. Our support team responds within 24-48 hours.";
  }
  
  if (lowerMessage.includes('journal') || lowerMessage.includes('scope')) {
    return "We publish in multiple fields including science, technology, medicine, social sciences, and humanities. Visit our Journals section to find the best fit for your research.";
  }

  // Default response
  return "Thank you for your question! For detailed information about submissions, peer review, and our services, please visit our Author Guidelines or contact us at authors@srpublishinghouse.com. How else can I assist you today?";
}