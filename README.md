# Filipino Apostolate of Boston - Website Revamp

A modern website for the Filipino Apostolate of the Archdiocese of Boston, built with Next.js 14+ and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Clyde0513/kapwa-codefest-2025--thinking-of-a-name-rn-.git
cd kapwa-codefest-2025--thinking-of-a-name-rn-
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure (Work in Progress)

```
kapwa-codefest-2025--thinking-of-a-name-rn-/
├── app/
│   ├── components/
│   │   ├── Header.tsx      # Navigation header with logo and menu
│   │   └── Hero.tsx        # Hero section with welcome message and CTAs
│   ├── globals.css         # Global styles and Tailwind directives
│   ├── layout.tsx          # Root layout with fonts and metadata
│   └── page.tsx            # Homepage
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Design System

### Colors
- **Primary Blue**: Custom blue palette for headers and primary elements
- **Accent Yellow**: `#fbbf24` for highlights and CTAs
- **Maroon**: `#dc2626` for important action buttons

### Typography
- **Headings**: Poppins font family
- **Body**: Inter font family

## Tech Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Google Fonts (Inter & Poppins)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Implementation Roadmap

### Phase 1: Foundation (Current)
- ✅ Next.js setup with TypeScript
- ✅ Tailwind CSS configuration
- ✅ Header component with navigation
- ✅ Hero section with CTAs
- ✅ Responsive design foundation

### Phase 2: Content Sections (Next)
- [ ] About Us section
- [ ] Leadership section with member cards
- [ ] Galleries/Photo albums
- [ ] Events calendar
- [ ] Mass schedule

### Phase 3: Features
- [ ] Contact form
- [ ] Social media integration
- [ ] Blog/News section
- [ ] Event registration
- [ ] Multi-language support (English/Tagalog)

### Phase 4: Optimization
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility improvements
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
