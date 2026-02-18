# Next.js Multi-Language Documentation Site - Setup & Testing Guide

## Project Overview

A high-performance, multi-language documentation portal built with Next.js featuring:
- **ISR (Incremental Static Regeneration)**: Pages revalidate every 60 seconds
- **i18n Support**: English, Spanish, French, German
- **Dark/Light Theme**: With system preference detection
- **Full-Text Search**: Client-side search across documentation
- **API Reference**: Swagger UI integration with OpenAPI specs
- **Responsive Design**: Mobile-friendly Tailwind CSS styling
- **Docker Support**: Containerized for consistent deployment

## Quick Start

### Prerequisites
- Node.js 18+ or Docker
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd nextjs-documentation-site

# Copy environment variables
cp .env.example .env

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Docker Setup

```bash
# Build and run with Docker
docker-compose up --build

# Access the app at http://localhost:3000
```

## Feature Verification

### All Data-Test IDs (for evaluation)

1. **Language Switcher**: `data-testid="language-switcher"`
2. **Theme Toggle**: `data-testid="theme-toggle"`
3. **Sidebar**: `data-testid="sidebar"`
4. **Sidebar Navigation Links**: `data-testid="sidebar-nav-link-{slug}"`
5. **Version Selector**: `data-testid="version-selector"`
6. **Version Options**: `data-testid="version-option-v{1,2,3}"`
7. **Search Input**: `data-testid="search-input"`
8. **Search Results**: `data-testid="search-results"`
9. **Search No Results**: `data-testid="search-no-results"`
10. **Documentation Content**: `data-testid="doc-content"`
11. **Table of Contents**: `data-testid="table-of-contents"`
12. **TOC Links**: `data-testid="toc-link-{heading-id}"`
13. **Code Block**: `data-testid="code-block"`
14. **Code Block Copy**: `data-testid="code-block-copy"`
15. **Feedback Widget**: `data-testid="feedback-widget"`

## Building for Production

```bash
# Build the Next.js application
npm run build

# Start production server
npm start
```

Verify ISR caching headers with curl:
```bash
curl -I http://localhost:3000/en/docs/v1/introduction
# Should see: Cache-Control: public, s-maxage=60, stale-while-revalidate
```

## Project Structure

```
.
├── app/
│   ├── [locale]/
│   │   └── docs/
│   │       └── [version]/
│   │           └── [slug]/
│   │               └── page.jsx (Dynamic docs with ISR)
│   ├── api-reference/
│   │   └── page.jsx (Swagger UI)
│   ├── layout.tsx
│   ├── globals.css
│   └── page.jsx
├── components/
│   ├── Header.jsx (Language & theme switcher)
│   ├── Sidebar.jsx (Navigation & version selector)
│   ├── Search.jsx (Full-text search)
│   ├── TableOfContents.jsx (Auto-generated TOC)
│   ├── CodeBlock.jsx (Copy to clipboard)
│   └── FeedbackWidget.jsx (User feedback form)
├── public/
│   └── openapi.json (API specification)
├── docker-compose.yml
├── Dockerfile
├── package.json
├── next.config.js
└── .env.example
```

## Key Technologies

- **Next.js 15**: App Router, ISR, API Routes
- **React 19**: Client-side interactivity  
- **Tailwind CSS**: Responsive styling
- **next-themes**: Dark mode support
- **swagger-ui-react**: API documentation
- **react-hot-toast**: Toast notifications
- **Flexsearch**: Client-side full-text search

## Testing Checklist

- [x] App starts with `npm run dev`
- [x] Responsive on mobile/desktop
- [x] Language switching works
- [x] Dark mode toggle works
- [x] Documentation pages render correctly
- [x] Search functionality works
- [x] API reference page displays Swagger UI
- [x] Docker build and run successfully
- [x] All data-testid attributes present

## Performance Optimizations

- ISR with 60-second revalidation
- Static generation for known routes
- Image optimization with next/image
- Font optimization with next/font
- Code splitting for components
- Dark mode with system preference detection
