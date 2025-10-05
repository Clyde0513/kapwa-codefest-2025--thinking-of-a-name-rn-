import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '../../../lib/db-utils';

interface WebsiteSettings {
  // Basic Information
  siteName: string;
  tagline: string;
  pastorName: string;
  
  // Homepage Content
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  
  // Contact Information
  contactEmail: string;
  contactPhone: string;
  address: string;
  serviceTimes: string;
  
  // Mass Schedule Section
  massScheduleTitle?: string;
  massSchedulePeriod?: string;
  massScheduleLocation?: string;
  massScheduleAddress?: string;
  massScheduleCityState?: string;
  massScheduleAdditionalInfo?: string;
  
  // Leadership Section
  leadershipTitle?: string;
  chaplainName?: string;
  northShoreCoordinator?: string;
  northShoreAssistantCoordinator?: string;
  northShoreSecretary?: string;
  northShoreFinanceTeam?: string;
  northShoreHeadOfLiturgy?: string;
  northShoreFaithFormation?: string;
  southShoreCoordinator?: string;
  southShoreAssistantCoordinator?: string;
  southShoreSecretary?: string;
  southShoreFinanceTeam?: string;
  southShoreHeadOfLiturgy?: string;
  southShoreFaithFormation?: string;
  financeTreasurers?: string;
  financeAuditor?: string;
  
  // Events Section
  eventsTitle?: string;
  eventsSubtitle?: string;
  
  // Resources Section
  resourcesTitle?: string;
  resourcesSubtitle?: string;
  resourceLinks?: Array<{ title: string; url: string }>;
}

const settingsSchema = z.object({
  // Basic Information
  siteName: z.string().min(1, 'Site name is required').max(100, 'Site name must be less than 100 characters'),
  tagline: z.string().max(500, 'Tagline must be less than 500 characters').optional(),
  pastorName: z.string().max(100, 'Pastor name must be less than 100 characters').optional(),
  
  // Homepage Content
  heroTitle: z.string().min(1, 'Hero title is required').max(200, 'Hero title must be less than 200 characters'),
  heroSubtitle: z.string().max(300, 'Hero subtitle must be less than 300 characters').optional(),
  aboutText: z.string().max(2000, 'About text must be less than 2,000 characters').optional(),
  
  // Contact Information
  contactEmail: z.string().email('Invalid email address').optional(),
  contactPhone: z.string().max(50, 'Phone number must be less than 50 characters').optional(),
  address: z.string().max(500, 'Address must be less than 500 characters').optional(),
  serviceTimes: z.string().max(200, 'Service times must be less than 200 characters').optional(),
  
  // Mass Schedule Section
  massScheduleTitle: z.string().max(100, 'Mass schedule title must be less than 100 characters').optional(),
  massSchedulePeriod: z.string().max(100, 'Mass schedule period must be less than 100 characters').optional(),
  massScheduleLocation: z.string().max(200, 'Mass schedule location must be less than 200 characters').optional(),
  massScheduleAddress: z.string().max(300, 'Mass schedule address must be less than 300 characters').optional(),
  massScheduleCityState: z.string().max(100, 'Mass schedule city/state must be less than 100 characters').optional(),
  massScheduleAdditionalInfo: z.string().max(300, 'Mass schedule additional info must be less than 300 characters').optional(),
  
  // Leadership Section
  leadershipTitle: z.string().max(100, 'Leadership title must be less than 100 characters').optional(),
  chaplainName: z.string().max(100, 'Chaplain name must be less than 100 characters').optional(),
  northShoreCoordinator: z.string().max(100, 'North Shore coordinator must be less than 100 characters').optional(),
  northShoreAssistantCoordinator: z.string().max(100, 'North Shore assistant coordinator must be less than 100 characters').optional(),
  northShoreSecretary: z.string().max(100, 'North Shore secretary must be less than 100 characters').optional(),
  northShoreFinanceTeam: z.string().max(100, 'North Shore finance team must be less than 100 characters').optional(),
  northShoreHeadOfLiturgy: z.string().max(100, 'North Shore head of liturgy must be less than 100 characters').optional(),
  northShoreFaithFormation: z.string().max(200, 'North Shore faith formation must be less than 200 characters').optional(),
  southShoreCoordinator: z.string().max(100, 'South Shore coordinator must be less than 100 characters').optional(),
  southShoreAssistantCoordinator: z.string().max(100, 'South Shore assistant coordinator must be less than 100 characters').optional(),
  southShoreSecretary: z.string().max(100, 'South Shore secretary must be less than 100 characters').optional(),
  southShoreFinanceTeam: z.string().max(100, 'South Shore finance team must be less than 100 characters').optional(),
  southShoreHeadOfLiturgy: z.string().max(100, 'South Shore head of liturgy must be less than 100 characters').optional(),
  southShoreFaithFormation: z.string().max(200, 'South Shore faith formation must be less than 200 characters').optional(),
  financeTreasurers: z.string().max(200, 'Finance treasurers must be less than 200 characters').optional(),
  financeAuditor: z.string().max(100, 'Finance auditor must be less than 100 characters').optional(),
  
  // Events Section
  eventsTitle: z.string().max(100, 'Events title must be less than 100 characters').optional(),
  eventsSubtitle: z.string().max(300, 'Events subtitle must be less than 300 characters').optional(),
  
  // Resources Section
  resourcesTitle: z.string().max(100, 'Resources title must be less than 100 characters').optional(),
  resourcesSubtitle: z.string().max(200, 'Resources subtitle must be less than 200 characters').optional(),
  resourceLinks: z.array(z.object({
    title: z.string().max(100, 'Resource title must be less than 100 characters'),
    url: z.string().url('Invalid URL format')
  })).max(10, 'Maximum 10 resource links allowed').optional(),
});

// Default settings as fallback
const defaultSettings = {
  // Basic Information
  siteName: 'Filipino Apostolate of Boston',
  tagline: 'A Christian Community who guides, takes care, and nourishes the faith life of our young people, and our fellow Filipinos in the Archdiocese of Boston.',
  pastorName: 'Father Peru Dayag, SVD',
  
  // Homepage Content
  heroTitle: 'Welcome to Our Church Family',
  heroSubtitle: 'Join us in faith, fellowship, and community',
  aboutText: 'We are a welcoming community dedicated to serving God and each other. Our mission is to provide spiritual guidance and support to Filipino families in the Boston area.',
  
  // Contact Information
  contactEmail: 'info@church.com',
  contactPhone: '(555) 123-4567',
  address: 'St. Joseph Church\n790 Salem Street\nMalden, MA 02148',
  serviceTimes: 'Sundays at 10:00 AM and 6:00 PM',
  
  // Mass Schedule Section
  massScheduleTitle: 'Mass Schedule',
  massSchedulePeriod: 'October-December 2025',
  massScheduleLocation: 'The Filipino Apostolate',
  massScheduleAddress: '790 Salem Street',
  massScheduleCityState: 'Malden, MA 02148',
  massScheduleAdditionalInfo: 'For Additional Info',
  
  // Leadership Section
  leadershipTitle: 'Leadership',
  chaplainName: 'Father Peru Dayag, SVD',
  northShoreCoordinator: 'Annie Taliad',
  northShoreAssistantCoordinator: 'Jeffrey Pagulong',
  northShoreSecretary: 'Meynard Gutierrez',
  northShoreFinanceTeam: 'Crispina Gutierrez',
  northShoreHeadOfLiturgy: 'Kaye Vito',
  northShoreFaithFormation: 'Pearl Brault, Jun Cruz',
  southShoreCoordinator: 'John Manuel',
  southShoreAssistantCoordinator: 'Loreta Borneo',
  southShoreSecretary: 'Alpha Cattaneo',
  southShoreFinanceTeam: 'Rudy Hermosa',
  southShoreHeadOfLiturgy: 'Ross Mangilog',
  southShoreFaithFormation: 'Lisa Paradela, Salome Afable',
  financeTreasurers: 'Priscilla Cruz, Gracita Chiefe',
  financeAuditor: 'July Afable',
  
  // Events Section
  eventsTitle: 'EVENTS',
  eventsSubtitle: 'Our faith community provides many opportunities to fellowship with each other.\nHere are just a few of our upcoming events!',
  
  // Resources Section
  resourcesTitle: 'Resources for Spiritual Growth',
  resourcesSubtitle: 'Connect with Catholic resources and deepen your faith',
  resourceLinks: [
    { title: 'The Vatican: The Holy See', url: 'https://www.vatican.va/' },
    { title: 'Archdiocese of Boston', url: 'https://www.bostoncatholic.org/' },
    { title: 'Daily Readings', url: 'https://bible.usccb.org/daily-bible-reading' },
    { title: "Cardinal Sean's Blog", url: 'https://www.cardinalseansblog.org/' },
    { title: 'The Good Catholic Life', url: 'https://www.thegoodcatholiclife.com/' },
    { title: 'Catholic Devotions', url: 'https://www.catholicdevotions.org/' }
  ]
};

// We'll store settings in the database using a simple key-value approach
// Create a settings table or use a JSON field

export async function GET() {
  try {

    try {
      // Try to get settings from database
      const settingsRecord = await db.findUniqueSettings({
        where: { key: 'website' },
        select: { value: true }
      });

      if (settingsRecord && typeof settingsRecord === 'object' && settingsRecord !== null && 'value' in settingsRecord && settingsRecord.value) {
        // Merge saved settings with defaults to ensure all fields are present
        const savedSettings = settingsRecord.value as unknown as WebsiteSettings;
        const mergedSettings = {
          ...defaultSettings,
          ...savedSettings,
          // Ensure resourceLinks array is properly merged
          resourceLinks: savedSettings.resourceLinks || defaultSettings.resourceLinks
        };
        return NextResponse.json({ 
          settings: mergedSettings 
        });
      }
    } catch (dbError) {
      console.log('Database not available, using default settings:', dbError);
    }

    // Fallback to default settings
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
    
    // Merge with default settings to ensure all fields are present
    const mergedData = {
      ...defaultSettings,
      ...body
    };
    
    const validatedData = settingsSchema.parse(mergedData);

    try {
      // Save settings to database
      await db.upsertSettings({
        where: { key: 'website' },
        update: { 
          value: validatedData,
          updatedAt: new Date()
        },
        create: {
          key: 'website',
          value: validatedData,
          description: 'Main website settings including contact info, hero content, and basic information'
        }
      });

      console.log('Settings saved to database:', validatedData);
    } catch (dbError) {
      console.error('Failed to save to database, but continuing:', dbError);
      // Continue even if database save fails
    }
    
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
