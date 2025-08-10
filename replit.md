# Birthday Surprise Website

## Overview

This is a personalized birthday website for Ruthvika's 18th birthday. The application is built as a full-stack TypeScript application with a React frontend and Express backend, designed to display heartfelt messages, memories, music, and photos submitted by friends through a Google Sheets form.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Build System**: ESBuild for production builds
- **Development**: tsx for TypeScript execution in development
- **Architecture Pattern**: RESTful API structure (currently minimal implementation)

### Data Architecture
- **Primary Data Source**: Google Sheets API for reading birthday messages and submissions
- **Database Schema**: Drizzle ORM with PostgreSQL schema defined but using in-memory storage currently
- **Data Processing**: Client-side parsing and organization of Google Sheets data into categorized sections

## Key Components

### Frontend Components
1. **Birthday Page Components**:
   - `HeroSection`: Main birthday greeting with hero image and confetti balloon
   - `FriendCard`: Display individual messages from friends
   - `SpotifyCard`: Embedded Spotify tracks shared by friends
   - `PhotoCard`: Display photos shared by friends (replaced by MediaCarousel)
   - `MediaCarousel`: Responsive horizontal carousel for friend media files
   - `MediaLightbox`: Fullscreen lightbox for media viewing
   - `MemoryDumpSection`: Container for all friends' media carousels
   - `FuturePredictionsCard`: Custom card design for future predictions
   - `SectionHeader`: Reusable section headers with emojis
   - `LoadingOverlay`: Loading state with themed spinner
   - `SurpriseBar`: Temporary notification bar

2. **UI Components**: Complete shadcn/ui component library including buttons, cards, dialogs, forms, and more

3. **Custom Hooks**:
   - `useBirthdayData`: Fetches and processes Google Sheets data
   - `useConfetti`: Triggers confetti animations
   - `useToast`: Toast notification system

### Backend Components
1. **Server Setup**: Express server with middleware for JSON parsing and request logging
2. **Routes**: Placeholder route structure with storage interface
3. **Storage**: In-memory storage implementation with user management interface
4. **Vite Integration**: Development server setup with HMR support

## Data Flow

1. **Data Source**: Google Sheets serves as the primary data source containing form responses
2. **API Integration**: Client fetches data from Google Sheets API using a public API key
3. **Data Processing**: Raw sheet data is parsed and organized into categorized sections:
   - Heart Messages
   - Memory Lane
   - Music Vibes
   - Photo Gallery
   - Personal Meaning
   - Future Predictions
   - Life Advice
   - Final Notes
4. **State Management**: TanStack Query manages the fetched data with caching and error handling
5. **UI Rendering**: Components render the organized data with themed styling and animations

## External Dependencies

### Core Dependencies
- **Google Sheets API**: External data source for birthday messages
- **Neon Database**: PostgreSQL database provider (configured but not actively used)
- **Radix UI**: Headless UI component primitives
- **TanStack Query**: Server state management
- **Canvas Confetti**: Celebration animations

### Development Dependencies
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety and development experience
- **Drizzle ORM**: Database ORM and migration tool

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds the React application to `dist/public`
- **Backend**: ESBuild bundles the server code to `dist/index.js`
- **Assets**: Static assets are processed through Vite's asset pipeline

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution with HMR
- **Production**: Runs compiled JavaScript with NODE_ENV=production
- **Database**: Expects DATABASE_URL environment variable for PostgreSQL connection

### Deployment Requirements
- Node.js runtime environment
- PostgreSQL database (if database features are enabled)
- Environment variables for Google Sheets API and database connection

## Changelog

```
Changelog:
- July 14, 2025. Enhanced carousel with reset and infinite looping functionality
  - Added reset button to MediaLightbox for returning to original zoom/rotation
  - Implemented infinite looping in both MediaCarousel and MediaLightbox components
  - Added keyboard shortcut 'R' for reset functionality in lightbox
  - Fixed directory mapping for Deetya (deetyaa folder) and Gini (capitalized folder)
  - Updated confetti z-index to 1000 to appear above all cards and content
- July 12, 2025. Fixed memory dump section to show all friends with media
  - Updated use-media-files.ts to include all friends from media directory
  - Added comprehensive name matching for nicknames from Google Sheets data
  - Fixed bidirectional heart animations in background
  - Enhanced friend name variations for better data matching
  - Added support for Deetya, Gini, Kriish, Rithikaa, Roshini, Shirly and other missing friends
- July 08, 2025. Added responsive media carousel gallery to Memory Dump section
  - Created MediaCarousel component with horizontal scrolling and navigation arrows
  - Added MediaLightbox component for fullscreen media viewing
  - Set up static media file serving for /media directory
  - Applied pastel birthday theme styling with custom CSS classes
  - Added keyboard navigation and mobile-friendly touch gestures
  - Limited media display to 3 items per friend for balanced presentation
  - Changed media display to show full images/videos without cropping (object-contain)
  - Added cute "click here!" note near balloon confetti button
  - Created custom FuturePredictionsCard component with crown icons and theme colors
  - Kept original FriendCard design for life advice section
- July 02, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```