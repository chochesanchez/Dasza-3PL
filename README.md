<div align="center">
  <img src="./public/images/Dasza%20Logistics%20Logo%202.png" alt="Dasza 3PL Logo" width="300" height="300" />
</div>

# Dasza 3PL | Supply Chain Solutions

A modern web platform for **third-party logistics** solutions in Mexico, specializing in IMMEX AAA warehousing, inventory control, and intermodal logistics.

**Live Site:** [dasza3pl.com](https://dasza3pl.com)

---

## 🎯 Overview

**Dasza 3PL** is a premium logistics platform with 17+ years of industry experience, serving manufacturing companies across Mexico. We design and operate disciplined logistics and warehousing solutions with real-time inventory visibility and end-to-end control.

### Key Stats
- **17+ Years** of logistics expertise
- **200,000+ Sqft** of warehouse capacity
- **200,000+ Pallets** processed annually
- **Trusted by Industry Leaders** including Magna, Daimler Trucks, Office Depot, and more

---

## 🚀 Features

### Core Services
- **IMMEX AAA Industrial | Shelter** - Specialized industrial warehousing with customs compliance
- **VMI (Vendor Managed Inventory)** - Automated inventory management and replenishment
- **Warehousing** - Temperature-controlled storage with real-time tracking
- **Logistics** - End-to-end supply chain management
- **Distribution & Last Mile** - Door-to-door delivery services
- **Customs** - International import/export documentation and compliance
- **Fulfillment** - Order processing and fulfillment services
- **Retail Distribution** - Retail-focused logistics solutions
- **Sorting & Consolidation** - Cargo sorting and consolidation services
- **VMI Storage** - Long-term vendor-managed storage

### Technology Features
- 📱 **Fully Responsive Design** - Mobile, tablet, and desktop optimized
- ✨ **Smooth Animations** - Framer Motion for engaging UI interactions
- 📊 **Real-time Analytics** - Track platform performance and user engagement
- 📧 **Contact & Quote System** - Integrated email notifications with Resend
- 🗺️ **Google Maps Integration** - Location-based services
- 🔄 **Page Transitions** - Smooth navigation between pages
- 📍 **Scroll Progress Indicator** - Visual reading progress
- ♿ **Accessibility** - Built with modern web standards

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js 15](https://nextjs.org/) with React 19
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) + PostCSS
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [@heroicons/react](https://heroicons.com/)
- **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)

### Backend & Database
- **Database:** [MongoDB](https://www.mongodb.com/) via [Prisma](https://www.prisma.io/)
- **Authentication:** [Supabase](https://supabase.com/)
- **Email Service:** [Resend](https://resend.com/)
- **Validation:** [Zod](https://zod.dev/)

### Development
- **Linting:** [ESLint](https://eslint.org/)
- **Package Manager:** npm

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with metadata
│   ├── globals.css               # Global styles
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── quote/                    # Quote request page
│   ├── news/                     # News/blog section
│   ├── services/                 # Service pages
│   │   ├── warehousing/
│   │   ├── logistics/
│   │   ├── last-mile/
│   │   ├── vmi/
│   │   ├── customs/
│   │   ├── fulfillment/
│   │   ├── retail/
│   │   ├── sorting/
│   │   ├── door-to-door/
│   │   └── storage/
│   ├── api/
│   │   └── contact/              # Contact form API endpoint
│   └── robots.ts                 # SEO robots config
├── components/
│   ├── shared/                   # Shared components (Header, Footer, Analytics)
│   └── ui/                       # Reusable UI components
└── lib/                          # Utilities and helpers

prisma/
└── schema.prisma                 # Database schema

public/
├── images/                       # Brand assets and service images
├── favicon-2025.ico              # Favicon
└── favicon-2025-512.png          # Apple touch icon
```

---

## 📊 Database Schema

### Contact Model
Captures general inquiries from potential clients:
```prisma
model Contact {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  company   String?
  email     String
  phone     String?
  message   String?
  createdAt DateTime @default(now())
}
```

### Quote Model
Captures detailed logistics quote requests:
```prisma
model Quote {
  id             String   @id @default(auto()) @map("_id") @db.ObjectId
  name           String
  email          String
  phone          String?
  company        String
  address        String?
  productType    String
  quantity       Int
  volume         String?
  weight         String?
  photoUrl       String?
  hsCode         String
  origin         String
  incoterm       String?
  port           String?
  frequency      String?
  destinations   String?
  storageRequired Boolean @default(false)
  conditions     String[]
  timing         String?
  options        String[]
  comments       String?
  utmSource      String?
  utmCampaign    String?
  createdAt      DateTime @default(now())
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB connection string
- Supabase project (optional, for authentication)
- Resend API key (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chochesanchez/Dasza-3PL.git
   cd Dasza-3PL
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   DATABASE_URL=your_mongodb_connection_string
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Generate Prisma client**
   ```bash
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🔨 Available Scripts

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm start`** - Start production server
- **`npm run lint`** - Run ESLint

---

## 📄 Pages & Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with services overview |
| `/about` | Company information and values |
| `/contact` | General contact form |
| `/quote` | Detailed quote request form |
| `/quote/thank-you` | Quote confirmation page |
| `/services` | All services overview |
| `/services/warehousing` | Warehousing details |
| `/services/vmi` | VMI services details |
| `/services/logistics` | Logistics services details |
| `/services/last-mile` | Distribution & last mile |
| `/services/customs` | Customs services |
| `/services/fulfillment` | Fulfillment services |
| `/services/retail` | Retail distribution |
| `/services/sorting` | Sorting services |
| `/services/door-to-door` | Door-to-door delivery |
| `/services/storage` | Storage solutions |
| `/news` | News and updates |

---

## 🎨 Design System

The platform uses a cohesive color scheme and typography:

### Colors
- **Primary Navy:** `#00324E` - Brand primary
- **Cyan Accent:** `#00B4EF` - Call-to-action
- **Charcoal:** Dark grays for text
- **Light Gray:** Borders and backgrounds

### Typography
- **Font:** Inter (Google Fonts)
- **Responsive:** Scales from mobile to desktop

### Components
- **Reveal:** Entrance animations
- **Section:** Consistent spacing wrapper
- **FeatureCard:** Service/feature showcase
- **ContactForm:** Reusable form component

---

## 🔐 Security

- React Server Components for reduced client-side exposure
- Type-safe data validation with Zod
- Prisma for safe database queries
- Environment variables for sensitive data
- CSRF protection via Next.js

---

## 📧 Contact & Support

- **Website:** [dasza3pl.com](https://dasza3pl.com)
- **Contact Form:** Available at `/contact`
- **Quote Request:** Available at `/quote`

---

## 📝 License

This project is proprietary software. All rights reserved © Dasza 3PL.

---

## 🤝 Contributing

This is a private project. For contributions or feature requests, please contact the development team.

---

## 📊 Trusted By

We proudly serve industry leaders including:
- Magna International
- Daimler Trucks
- Office Depot
- US Motors
- MotoRad
- Fluidmaster
- RXN
- Nordic Automotive
- And many more manufacturing leaders

---

**Built with ❤️ by the Dasza 3PL Team**
