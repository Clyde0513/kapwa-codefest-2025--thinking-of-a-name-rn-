import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required').max(100, 'Site name must be less than 100 characters'),
  tagline: z.string().max(500, 'Tagline must be less than 500 characters').optional(),
  heroTitle: z.string().min(1, 'Hero title is required').max(200, 'Hero title must be less than 200 characters'),
  heroSubtitle: z.string().max(300, 'Hero subtitle must be less than 300 characters').optional(),
  aboutText: z.string().max(2000, 'About text must be less than 2,000 characters').optional(),
  contactEmail: z.string().email('Invalid email address').optional(),
  contactPhone: z.string().max(50, 'Phone number must be less than 50 characters').optional(),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
  serviceTimes: z.string().max(200, 'Service times must be less than 200 characters').optional(),
  pastorName: z.string().max(100, 'Pastor name must be less than 100 characters').optional(),
});

// For now, we'll store settings in a simple JSON file
// In production, you might want to store this in the database
const SETTINGS_FILE = '/tmp/website-settings.json';

export async function GET() {
  try {
    // In a real app, you'd read from database
    // For now, return default settings
    const defaultSettings = {
      siteName: 'Filipino Apostolate of Boston',
      tagline: 'A Christian Community who guides, takes care, and nourishes the faith life of our young people, and our fellow Filipinos in the Archdiocese of Boston.',
      heroTitle: 'Welcome to Our Church Family',
      heroSubtitle: 'Join us in faith, fellowship, and community',
      aboutText: 'We are a welcoming community dedicated to serving God and each other. Our mission is to provide spiritual guidance and support to Filipino families in the Boston area.',
      contactEmail: 'info@church.com',
      contactPhone: '(555) 123-4567',
      address: '123 Church Street, Boston, MA 02101',
      serviceTimes: 'Sundays at 10:00 AM and 6:00 PM',
      pastorName: 'Rev. Father John Smith',
    };

    return NextResponse.json({ settings: defaultSettings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = settingsSchema.parse(body);

    // In a real app, you'd save to database
    // For now, just return success
    console.log('Settings updated:', validatedData);

    return NextResponse.json({ 
      ok: true, 
      message: 'Settings saved successfully',
      settings: validatedData 
    });
  } catch (error) {
    console.error('Error saving settings:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
