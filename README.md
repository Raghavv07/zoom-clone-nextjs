<div align="center">
  <img src="/icons/logo.svg" alt="YOOM Logo" width="80" height="80" />
  <h1>YOOM — Video Conferencing Platform</h1>
  <p>
    An enterprise-grade, real-time video conferencing application built with Next.js 16, Stream Video SDK, Better Auth, and Neon PostgreSQL.
  </p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Better_Auth-1.7-purple?style=for-the-badge&logo=auth0&logoColor=white" alt="Better Auth" />
    <img src="https://img.shields.io/badge/Neon-PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=white" alt="Neon PostgreSQL" />
    <img src="https://img.shields.io/badge/Stream-Video_SDK-005FFF?style=for-the-badge&logo=stream&logoColor=white" alt="Stream Video" />
  </div>
</div>

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Tech Stack](#-tech-stack)
3. [Key Features](#-key-features)
4. [Getting Started](#-getting-started)
5. [Environment Variables](#-environment-variables)
6. [Project Structure](#-project-structure)
7. [Scripts](#-scripts)

---

## 🌟 Overview

**YOOM** is a modern video calling and meeting workspace inspired by Zoom. It provides high-definition audio/video calls, screen sharing, interactive participant controls, meeting recordings, and custom personal meeting rooms.

Built on the latest **Next.js 16** with Turbopack, it implements the official **`proxy.ts`** standard for edge route protection, utilizes **Better Auth** with a **Neon Serverless PostgreSQL** database, and delivers a sleek, responsive dark-mode UI for both mobile and desktop screens.

---

## ⚙️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, `proxy.ts`)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Authentication**: [Better Auth](https://better-auth.com/) (Email & Password, Secure Sessions)
- **Database**: [Neon](https://neon.tech/) (Serverless PostgreSQL via Node `pg` driver)
- **Video & Audio Infrastructure**: [GetStream Video SDK](https://getstream.io/video/) (`@stream-io/video-react-sdk` & `@stream-io/node-sdk`)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & Lucide React Icons
- **Date & Time Picker**: `react-datepicker` with custom dark-mode theme

---

## 🔋 Key Features

* 🔒 **Secure Authentication**: User sign-up, sign-in, and persistent sessions managed by **Better Auth** with passwords securely hashed and stored in **Neon PostgreSQL**.
* 🛡️ **Next.js 16 `proxy.ts` Protection**: Route access and authentication boundaries protected using the latest Next.js 16 proxy convention.
* 🎥 **Instant & Scheduled Meetings**: Launch instant meetings or schedule future calls with custom dates, times, and descriptions.
* 🎛️ **Comprehensive In-Meeting Controls**:
  - Microphone & Camera toggle
  - High-definition Screen Sharing
  - Interactive Emoji Reactions
  - Grid Layout & Speaker Layout switching
  - Participant list drawer with host controls (mute, pin, allow video)
  - End meeting for everyone (host privilege) or leave meeting
* 🏠 **Personal Meeting Room**: Dedicated static meeting URL and ID for instant invitations and recurring team catchups.
* 📼 **Meeting Recordings**: Access and replay past meeting recordings directly from the dashboard.
* 📱 **Mobile-First Responsive Design**: Optimized UI/UX across all viewports—including mobile hamburger navigation, responsive dialog modals, and touch-friendly controls.
* ⚡ **Core Web Vitals Optimized**: Zero hydration mismatches with dynamic live clock rendering, optimized image priority, and responsive viewports.

---

## 🤸 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.17 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zoom-clone-nextjs.git
cd zoom-clone-nextjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Fill in your actual credentials in `.env.local` (see [Environment Variables](#-environment-variables) below).

### 4. Run Better Auth Database Migration

Run the migration command to initialize user and session tables in your Neon PostgreSQL database:

```bash
npx @better-auth/cli migrate
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

The application requires the following environment variables:

```env
# Database (Neon Serverless PostgreSQL)
DATABASE_URL=postgresql://user:password@host/neondb?sslmode=require

# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret_32_characters_long
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stream Video SDK (https://getstream.io/)
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_SECRET_KEY=your_stream_secret_key

# Application Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Where to get credentials:
- **Neon Database**: Sign up at [neon.tech](https://neon.tech/) and copy your pooled connection string into `DATABASE_URL`.
- **Stream Video SDK**: Sign up at [getstream.io](https://getstream.io/), create a **Video & Audio** app in the dashboard, and copy your **API Key** and **Secret Key**.
- **Better Auth Secret**: Any secure 32+ character random string (e.g. generated via `openssl rand -base64 32`).

---

## 📁 Project Structure

```text
├── actions/
│   └── stream.actions.ts        # Server action for generating Stream Video user tokens
├── app/
│   ├── (auth)/
│   │   ├── sign-in/             # Sign-in page with Better Auth
│   │   └── sign-up/             # Sign-up page with Better Auth
│   ├── (root)/
│   │   ├── (home)/              # Main dashboard routes (Home, Upcoming, Previous, Recordings, Personal Room)
│   │   └── meeting/[id]/        # Real-time Video Meeting Room & Setup
│   ├── api/
│   │   └── auth/[...all]/       # Better Auth API Route Handler
│   ├── error.tsx                # Global client error boundary
│   ├── loading.tsx              # Route suspense loading state
│   ├── not-found.tsx            # Custom 404 page
│   ├── layout.tsx               # Root layout with metadata and viewport
│   └── globals.css              # Global styles & Stream video overrides
├── components/                  # Reusable UI components (Navbar, Sidebar, MeetingCard, UserButton, etc.)
├── hooks/                       # Custom hooks (useGetCalls, useGetCallById)
├── lib/
│   ├── auth.ts                  # Server-side Better Auth setup with Neon PostgreSQL Pool
│   ├── auth-client.ts           # Client-side Better Auth authentication client
│   └── utils.ts                 # Utility functions (cn)
├── proxy.ts                     # Next.js 16 route protection & session verification
├── next.config.mjs              # Next.js configuration
└── package.json
```

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs Next.js ESLint to verify code quality |
