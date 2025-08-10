# Birthday Surprise Website for Ruthvika

A personalized 18th birthday celebration website featuring interactive elements, animated backgrounds, and multimedia content from friends.

## Features

- **Interactive Hero Section** with confetti balloon button
- **Animated Background** with flowing heart elements
- **Google Sheets Integration** for live birthday messages
- **Media Gallery** with advanced carousel functionality
- **Responsive Design** optimized for all devices
- **Advanced Lightbox** with zoom, rotate, and reset features
- **Infinite Carousel** looping through memories

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI
- **Data**: Google Sheets API integration
- **Animations**: Framer Motion, Canvas Confetti

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd birthday-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with:
   ```
   GOOGLE_SHEETS_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── birthday/   # Birthday-specific components
│   │   │   └── ui/         # shadcn/ui components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript definitions
├── server/                 # Express backend
├── media/                  # Static media files
├── public/                 # Public assets
└── shared/                 # Shared utilities and schemas
```

## Key Components

### Birthday Components
- `HeroSection` - Main birthday greeting with confetti
- `MediaCarousel` - Horizontal scrolling media gallery
- `MediaLightbox` - Fullscreen media viewer with zoom/rotate
- `FriendCard` - Individual message display
- `AnimatedBackground` - Flowing heart animations

### Features
- **Infinite Looping**: Carousel automatically loops from end to start
- **Reset Functionality**: Return to original zoom/rotation in lightbox
- **Keyboard Navigation**: Arrow keys and 'R' for reset
- **Touch Gestures**: Mobile-friendly drag/swipe support
- **Responsive Design**: Adapts to all screen sizes

## Media Organization

Media files are organized by friend in the `/media` directory:
```
media/
├── images/
│   ├── deetyaa/     # Deetya's photos
│   ├── Gini/        # Gini's photos
│   └── ...
└── videos/
    ├── suhas/       # Suhas's videos
    └── ...
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Adding New Friends
1. Add media files to appropriate `/media/images/[friend]` or `/media/videos/[friend]` folder
2. Update the `knownFiles` and `directoryMapping` objects in `MediaCarousel.tsx`
3. The Google Sheets data will automatically populate other sections

## Deployment

The project is configured for Replit deployment with:
- Automatic builds via Vite
- Static file serving
- Environment variable support
- PostgreSQL database ready (if needed)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is created for personal use as a birthday celebration website.

---

Made with ❤️ for Ruthvika's 18th birthday