import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      subject, 
      message, 
      contactType = 'general',
      affiliation,
      phone 
    } = body;

    // Validation
    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters');
    }
    if (!email || !isValidEmail(email)) {
      errors.push('Valid email address is required');
    }
    if (!subject || subject.trim().length < 5) {
      errors.push('Subject is required and must be at least 5 characters');
    }
    if (!message || message.trim().length < 10) {
      errors.push('Message is required and must be at least 10 characters');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Validation failed',
          errors 
        },
        { status: 400 }
      );
    }

    // Create contact submission
    const contactSubmission = {
      id: `contact_${Date.now()}`,
      timestamp: new Date().toISOString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      contactType,
      affiliation: affiliation?.trim(),
      phone: phone?.trim(),
      status: 'received',
      priority: determinePriority(contactType, subject),
      autoResponse: generateAutoResponse(contactType)
    };

    // In a real application, you would:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Add to CRM system
    console.log('Contact submission received:', contactSubmission);

    return NextResponse.json(
      { 
        status: 'success', 
        message: 'Your message has been sent successfully! We will respond within 24-48 hours.',
        submissionId: contactSubmission.id,
        expectedResponse: '24-48 hours',
        autoResponse: contactSubmission.autoResponse
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to send message. Please try again later.',
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
      message: 'Contact API is running',
      contactInfo: {
        email: 'info@srpublishinghouse.com',
        authorSupport: 'authors@srpublishinghouse.com',
        editorial: 'editorial@srpublishinghouse.com',
        phone: '+1-234-567-8900',
        businessHours: '9:00 AM - 6:00 PM (UTC)',
        expectedResponse: '24-48 hours'
      },
      supportedTypes: [
        'general',
        'author-inquiry', 
        'submission-support',
        'editorial',
        'technical',
        'partnership'
      ],
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function determinePriority(contactType: string, subject: string): 'high' | 'medium' | 'low' {
  const urgentKeywords = ['urgent', 'emergency', 'deadline', 'asap', 'immediate'];
  const highPriorityTypes = ['editorial', 'technical', 'submission-support'];
  
  const subjectLower = subject.toLowerCase();
  const hasUrgentKeyword = urgentKeywords.some(keyword => subjectLower.includes(keyword));
  
  if (hasUrgentKeyword || highPriorityTypes.includes(contactType)) {
    return 'high';
  }
  
  if (contactType === 'author-inquiry') {
    return 'medium';
  }
  
  return 'low';
}

function generateAutoResponse(contactType: string): string {
  const responses = {
    'author-inquiry': 'Thank you for your author inquiry. Our editorial team will review your message and respond with guidance on submission requirements and processes.',
    'submission-support': 'We have received your submission support request. Our technical team will assist you with any submission platform issues or questions.',
    'editorial': 'Your message has been forwarded to our editorial team. We will provide feedback or clarification on editorial matters promptly.',
    'technical': 'Our technical support team has been notified of your issue. We will work to resolve any platform or technical difficulties quickly.',
    'partnership': 'Thank you for your partnership inquiry. Our business development team will review your proposal and get back to you soon.',
    'general': 'Thank you for contacting SR Publishing House. We have received your message and will respond as soon as possible.'
  };
  
  return responses[contactType as keyof typeof responses] || responses.general;
}