# Agri Market Platform

A Next.js-based listing platform for farmers and vendors to post their agricultural products.

## Features

- Google authentication via Supabase
- User onboarding with location detection
- Product categories grid with selling functionality
- Complete product listing form with image uploads
- Drag & drop image upload to Supabase Storage
- Responsive design with mobile-first approach
- Blue and white theme

## Setup

### Prerequisites

- Node.js 18+ 
- Supabase account and project

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Database Schema

Create the following table in your Supabase database:

```sql
-- User profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('farmer', 'trader')),
  phone TEXT,
  state TEXT,
  district TEXT,
  pincode TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);
```

### Google OAuth Setup

1. In your Supabase project, go to Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth client ID and secret
4. Configure redirect URLs in Google Cloud Console

### Installation

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/           # Auth group routes
│   │   └── login/        # Login page
│   ├── onboarding/       # User onboarding
│   ├── profile/          # User profile
│   └── layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── Header.tsx        # Navigation header
│   ├── CategoriesGrid.tsx # Product categories
│   └── HomeHeaderShell.tsx # Home page wrapper
├── lib/                   # Utility libraries
│   └── supabase.ts       # Supabase client
└── providers.tsx          # Auth context provider
```

## Authentication Flow

1. User visits `/login`
2. Clicks "Continue with Google"
3. Redirected to Google OAuth
4. After successful auth, redirected to `/onboarding`
5. User completes profile form
6. Profile saved to Supabase
7. User redirected to home page

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth with Google OAuth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with custom blue/white theme
