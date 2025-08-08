import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simulated author information data
    const authorInfo = {
      status: 'success',
      data: {
        totalAuthors: 1000,
        activeJournals: 8,
        averageReviewTime: '4-6 weeks',
        acceptanceRate: '35%',
        guidelines: {
          manuscriptFormats: ['PDF', 'DOC', 'DOCX'],
          maxFileSize: '10MB',
          referenceStyle: 'APA, Chicago, MLA',
          wordLimit: {
            research: '8000-12000',
            review: '6000-10000',
            brief: '3000-5000'
          }
        },
        supportServices: {
          languageEditing: true,
          copyEditing: true,
          proofreading: true,
          plagiarismCheck: true
        },
        contactInfo: {
          email: 'authors@srpublishinghouse.com',
          phone: '+1-234-567-8900',
          businessHours: '9:00 AM - 6:00 PM (UTC)',
          responseTime: '24-48 hours'
        }
      },
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(authorInfo, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error in author-info API:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to fetch author information',
        error: process.env.NODE_ENV === 'development' ? error : 'Internal server error'
      }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Handle author inquiries or submissions
    const inquiry = {
      id: `inquiry_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'received',
      ...body
    };

    // In a real application, you would save this to a database
    console.log('Author inquiry received:', inquiry);

    return NextResponse.json(
      { 
        status: 'success', 
        message: 'Inquiry submitted successfully',
        inquiryId: inquiry.id
      }, 
      { status: 201 }
    );

  } catch (error) {
    console.error('Error processing author inquiry:', error);
    
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Failed to process inquiry'
      }, 
      { status: 400 }
    );
  }
}
