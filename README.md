# 🏛️ Tiwala Kapwa - Church Community Platform

A comprehensive church community management platform built for Filipino Apostolates, featuring event management, blog/content management, photo & video galleries, and community engagement tools.

> **Built for**: Kapwa Codefest 2025 Hackathon  
> **Mission**: Empowering Filipino Catholic communities through modern technology

---

## Features

### Core Features 
- ✅ **Event Management System** - Full CRUD events with calendar integration
- ✅ **Content Management** - Database approach
- ✅ **Admin Dashboard** - Comprehensive admin panel for church staff
- ✅ **Blog Platform** - Rich content creation with Sanity Studio
- ✅ **Photo & Video Galleries** - Cloudinary-powered media management
- ✅ **User Engagement** - Comments, likes, and interactions
- ✅ **Calendar Views** - Interactive event calendar with FullCalendar
- ✅ **Responsive Design** - Mobile-first, beautiful UI

### User-Facing Pages
- 🏠 **Homepage** - Hero, upcoming events, blog posts, leadership
- 📅 **Events Calendar** - Interactive calendar view
- 📝 **Blog** - Community news and announcements
- 🙏 **Mission** - About the Filipino Apostolate
- 📸 **Galleries** - Photo and video showcases
- ⛪ **Mass Schedule** - Service times and locations

### Admin Features
- 📊 **Dashboard** - Overview of all content
- 📅 **Events Manager** - Create, edit, delete events
- ✍️ **Posts Manager** - Manage blog posts
- 📸 **Media Manager** - Upload and organize photos/videos
- ⚙️ **Settings** - Website configuration

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.17 or later
- **PostgreSQL** database (Neon, Supabase, or local)
- **Cloudinary** account (for media uploads)
- **Sanity** account (for CMS)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Clyde0513/kapwa-codefest-2025--thinking-of-a-name-rn-.git
cd kapwa-codefest-2025--thinking-of-a-name-rn-
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
Create a `.env` file in the root directory:
```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Sanity CMS (no longer being used)
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"


# Admin Authentication (simple)
ADMIN_PASSWORD="your-secure-password"
```

4. **Set up the database:**
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed initial data (optional)
npm run db:seed
```

5. **Run the development server:**
```bash
npm run dev
```

6. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
kapwa-codefest-2025--thinking-of-a-name-rn-/
├── app/
│   ├── admin/                    # Admin dashboard & management
│   │   ├── events/              # Event CRUD
│   │   │   ├── new/            # Create new event
│   │   │   └── [id]/edit/      # Edit event
│   │   ├── posts/               # Post management
│   │   ├── photos/              # Photo gallery management
│   │   ├── videos/              # Video management
│   │   ├── settings/            # Website settings
│   │   └── login/               # Admin authentication
│   ├── api/                      # API routes
│   │   ├── events/              # Events CRUD API
│   │   ├── posts/               # Posts API
│   │   ├── comments/            # Comments API
│   │   ├── likes/               # Likes API
│   │   ├── photos/              # Photo upload API
│   │   └── videos/              # Video upload API
│   ├── blog/                     # Blog pages
│   ├── calendar/                 # Calendar view
│   ├── mission/                  # Mission/About page
│   ├── studio/                   # Sanity Studio
│   └── components/               # Shared UI components
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── migrations/              # Database migrations
│   └── seed.mjs                 # Seed data script
├── sanity/                       # Sanity CMS configuration
│   ├── schemas/                 # Content schemas
│   └── lib/                     # Sanity utilities
├── lib/
│   ├── prisma.ts                # Prisma client
│   ├── sanityClient.ts          # Sanity client
│   ├── cloudinary.ts            # Cloudinary config
│   └── auth.ts                  # Authentication utilities
└── docs/                         # Documentation files
```

---

## Tech Stack

### Frontend
- **Framework**: Next.js 15.5+ (React 19)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Custom components with Tailwind

### Backend & Database
- **Database**: PostgreSQL (via Prisma ORM 6.16)
- **API**: Next.js API Routes
- **Validation**: Zod schema validation

### Content Management
- **CMS**: Sanity.io 4.10
- **Rich Text**: Portable Text with @portabletext/react
- **Media**: Sanity image & media library

### Calendar & Events
- **Calendar UI**: FullCalendar 6.1
- **Date Handling**: date-fns 4.1

### Development
- **Linting**: ESLint 9
- **Type Checking**: TypeScript strict mode
- **Database Tools**: Prisma Studio

---

## Database Schema

### Core Models
- **User** - User accounts and authentication
- **Post** - Blog posts and announcements
- **Event** - Church events with calendar integration
- **Comment** - User comments on posts
- **Like** - User likes/reactions
- **Photo** - Cloudinary-backed photo storage
- **Video** - Cloudinary-backed video storage
- **Settings** - Website configuration

See `prisma/schema.prisma` for complete schema details.

---

## Design System

### Brand Colors
- **Primary Maroon**: `#7A0000` to `#A01010` (gradient)
- **Accent Gold**: `#fbbf24`
- **Text**: Gray scale (50-900)
- **Background**: White, Gray-50

### Typography
- **Headings**: Poppins (Google Fonts)
- **Body**: Inter (Google Fonts)

### Components
- Responsive navigation header
- Hero section with CTAs
- Event cards and calendar views
- Blog post cards
- Photo/video galleries
- Admin dashboard panels

---

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)

# Production
npm run build           # Build for production
npm run start           # Start production server

# Database
npx prisma studio       # Open Prisma Studio GUI
npx prisma migrate dev  # Create & run migrations
npm run db:seed         # Seed database with sample data

# Code Quality
npm run lint            # Run ESLint

# Testing
npm run smoke           # Run smoke tests
```

---

## Admin Access

### Login
1. Navigate to `/admin/login`
2. Enter the admin password (set in `.env` as `ADMIN_PASSWORD`)
3. Access the admin dashboard at `/admin`

### Admin Features
- **Events**: Create, edit, delete events with calendar integration
- **Posts**: Manage blog posts (via database or Sanity)
- **Media**: Upload and manage photos/videos
- **Settings**: Configure website settings
- **Analytics**: View engagement metrics (likes, comments)

---

## API Endpoints

### Events API
- `GET /api/events` - List events (with pagination & filters)
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get single event
- `PATCH /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

### Posts API
- `GET /api/posts` - List posts
- `POST /api/posts` - Create post
- `GET /api/posts/[id]` - Get single post
- `PATCH /api/posts/[id]` - Update post
- `DELETE /api/posts/[id]` - Delete post

### Media API
- `POST /api/photos` - Upload photo to Cloudinary
- `POST /api/videos` - Upload video to Cloudinary
- `DELETE /api/photos/[id]` - Delete photo
- `DELETE /api/videos/[id]` - Delete video

### Engagement API
- `POST /api/likes` - Like a post/comment
- `POST /api/comments` - Add comment
- `DELETE /api/comments/[id]` - Delete comment

See `docs/` folder for detailed API documentation.

---

## Documentation

### Setup Guides
- **[SANITY_SETUP_GUIDE.md](./SANITY_SETUP_GUIDE.md)** - Sanity CMS setup
- **[CHURCH_ADMIN_GUIDE.md](./CHURCH_ADMIN_GUIDE.md)** - Admin user guide

### Feature Documentation
- **[EVENTS_FEATURE_DOCUMENTATION.md](./EVENTS_FEATURE_DOCUMENTATION.md)** - Events system
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Quick API reference
- **[ARCHITECTURE_RECOMMENDATION.md](./ARCHITECTURE_RECOMMENDATION.md)** - Architecture overview

### Technical Docs
- **[BUILD_SUCCESS.md](./BUILD_SUCCESS.md)** - Build verification
- **[POST_EDIT_FEATURE.md](./docs/POST_EDIT_FEATURE.md)** - Post editing feature
- **[SANITY_STUDIO_SETUP.md](./docs/SANITY_STUDIO_SETUP.md)** - Studio configuration

---

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables Checklist
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `DIRECT_URL` - Direct database connection
- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- [ ] `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset
- [ ] `SANITY_API_TOKEN` - Sanity API token
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- [ ] `ADMIN_PASSWORD` - Admin login password

---

## 🤝 Contributing

This project was built for the Kapwa Codefest 2025 Hackathon. Contributions are welcome!

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Kapwa Codefest 2025** - Hackathon organizers
- **Filipino Apostolate Community** - For inspiration and requirements
- **Open Source Community** - For amazing tools and libraries

---

## 📞 Support

For questions or issues:
- Open a GitHub Issue
- Check the [docs/](./docs/) folder for detailed guides
- Review the [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) for common tasks

---

**Built with ❤️ for the Filipino Catholic Community**
- [ ] Analytics integration

## 🤝 Contributing

This project was created for the Kapwa Codefest 2025 hackathon in collaboration with Ricky and Manny to support the Filipino Apostolate community.

## 📄 License

See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Special thanks to Ricky and Manny for their warmth, involvement, and dedication to their faith community.

Original site: https://filipinoapostolate.blogspot.com/

---

## Sanity blog example

This repo includes a small Sanity schema example in `sanity/schemas` and Next.js demo pages under `app/blog`.

Setup steps:

1. Install `next-sanity` in your Next.js project:

	npm install next-sanity

2. Create a Sanity project (https://www.sanity.io) and its Studio.
3. Copy the files from `sanity/schemas/` into your Studio's `schemas/` directory and deploy the studio.
4. Set environment variables in `.env.local` in this project:

	NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
	NEXT_PUBLIC_SANITY_DATASET=production
	# optional if you need draft/preview reads:
	SANITY_API_TOKEN=yourToken

5. Start the dev server:

	npm run dev

6. Visit `/blog` to see the list of posts once you have published posts in Sanity Studio.

The Next.js demo uses GROQ queries and `next-sanity` for fetching content. The demo pages are server components using ISR (`revalidate`) so published posts appear shortly after you publish.

FullCalendar
------------

This project includes a demo `EventsCalendar` component using FullCalendar. To enable it, install the following packages:

```
npm install @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
```

The calendar component is a client component and will appear once the packages are installed. You can then embed `<EventsCalendar />` where needed.
