import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  filename: string;
}

interface MediaCarouselProps {
  friendName: string;
  nicknameGiven?: string;
  nicknameForRuthvika?: string;
  onMediaClick?: (media: MediaItem, allMedia: MediaItem[]) => void;
}

export function MediaCarousel({ 
  friendName, 
  nicknameGiven, 
  nicknameForRuthvika, 
  onMediaClick 
}: MediaCarouselProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Determine items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(2); // lg screens
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2); // md screens
      } else {
        setItemsPerView(1); // sm screens
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Load media files for the friend
  useEffect(() => {
    const loadMediaFiles = async () => {
      setIsLoading(true);
      const media: MediaItem[] = [];
      
      // Complete files based on the actual directory structure
      const knownFiles = {
        'Ashmita': ['A1.jpeg', 'A2.jpeg', 'A3.jpeg', 'A4.jpeg', 'A5.jpeg', 'A6.jpeg', 'A7.jpeg', 'A8.jpeg', 'A9.jpeg', 'A10.jpeg', 'A11.jpeg', 'A12.jpeg', 'A13.jpeg', 'A14.jpeg', 'A15.jpeg', 'A16.jpeg', 'A17.jpeg', 'A18.jpeg', 'A19.jpeg', 'A20.jpeg', 'A21.jpeg', 'A22.jpeg', 'A23.jpeg'], // 23 photos found
        'Deetya': ['d1.jpeg', 'd2.jpeg', 'd3.jpeg', 'd4.jpeg', 'd5.jpeg', 'd6.jpeg', 'd7.jpeg', 'd8.jpeg', 'd9.jpeg', 'd10.jpeg', 'd11.jpeg', 'd12.jpeg', 'd13.jpeg', 'd14.jpeg', 'd15.jpeg', 'd16.jpeg', 'd18.jpeg'],
        'Gini': ['g1.jpg'],
        'Jason': ['j1.jpg', 'j2.jpg', 'j3.jpg'],
        'Krashanya': ['K1.jpg', 'K2.jpg'], // Actual files found
        'Kriish': ['k1.jpeg', 'k2.jpeg', 'k3.jpeg'],
        'Madhu': ['m1.jpg'],
        'Rishab': ['Rishab1.jpg'], // Actual file found
        'Rithikaa': ['R1.jpg', 'R2.jpg', 'R3.jpg', 'R4.jpg', 'R5.jpg', 'R6.jpg', 'R7.jpg', 'R8.jpg', 'R9.jpg'],
        'Roshini': ['r1.jpg', 'r2.jpg', 'r3.jpg', 'r4.jpg', 'r5.jpg', 'r6.jpg', 'r7.jpg'],
        'Sharvesh': ['sh1.jpg', 'sh11.jpg', 'Sh2.jpg', 'Sh3.jpg', 'Sh4.jpg', 'Sh6.jpg', 'Sh7.jpg', 'Sh8.jpg', 'Sh9.jpg', 'Sh10.mp4'],
        'Shirly': ['S1.jpg', 'S2.jpg'],
        'Suhas': ['s1.jpg', 's2.jpg', 's3.jpg', 'S3.jpg', 's4.jpg', 's5.jpg', 's6.jpg', 's7.mp4', 's8.mp4', 's9.mp4'],
        'Yashwanth': ['yv1.jpg'],
        'Yuvan': ['y1.jpg']
      };
      
      // Directory name mapping for cases where display name differs from folder name
      const directoryMapping = {
        'Ashmita': 'Ashmita',
        'Deetya': 'deetyaa',
        'Gini': 'Gini',
        'Jason': 'jason',
        'Krashanya': 'Krashanya',
        'Kriish': 'kriish',
        'Madhu': 'madhu',
        'Rishab': 'rishab',
        'Rithikaa': 'rithikaa',
        'Roshini': 'roshini',
        'Sharvesh': 'sharvesh',
        'Shirly': 'shirly',
        'Suhas': 'suhas',
        'Yashwanth': 'yashwanth',
        'Yuvan': 'yuvan'
      };
      
      // Try to load known files for this friend
      const friendFiles = knownFiles[friendName as keyof typeof knownFiles] || [];
      
      for (const filename of friendFiles) {
        try {
          const isVideo = filename.endsWith('.mp4');
          const folder = isVideo ? 'videos' : 'images';
          const friendFolder = directoryMapping[friendName as keyof typeof directoryMapping] || friendName.toLowerCase();
          const src = `/media/${folder}/${friendFolder}/${filename}`;
          
          // Check if file exists
          const response = await fetch(src, { method: 'HEAD' });
          if (response.ok) {
            media.push({
              type: isVideo ? 'video' : 'image',
              src,
              filename
            });
          }
        } catch {
          // File doesn't exist, continue
        }
      }
      
      // Show all media files for each friend
      
      setMediaItems(media);
      setIsLoading(false);
    };

    loadMediaFiles();
  }, [friendName]);

  const maxIndex = Math.max(0, mediaItems.length - itemsPerView);

  // Drag/swipe functionality
  const getPositionX = (e: React.MouseEvent | React.TouchEvent) => {
    return 'touches' in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(getPositionX(e));
    setDragCurrentX(getPositionX(e));
    
    if (trackRef.current) {
      trackRef.current.style.transition = 'none';
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentX = getPositionX(e);
    setDragCurrentX(currentX);
    
    const deltaX = currentX - dragStartX;
    const newTranslateX = -(currentIndex * (100 / itemsPerView)) + (deltaX / (carouselRef.current?.offsetWidth || 1)) * 100;
    
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newTranslateX}%)`;
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (trackRef.current) {
      trackRef.current.style.transition = 'transform 0.3s ease';
    }
    
    const deltaX = dragCurrentX - dragStartX;
    const threshold = 50;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      // Snap back to current position
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`;
      }
    }
  };

  const nextSlide = () => {
    const maxIndex = Math.ceil(mediaItems.length / itemsPerView) - 1;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.ceil(mediaItems.length / itemsPerView) - 1;
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  const handleMediaClick = (media: MediaItem) => {
    if (onMediaClick) {
      onMediaClick(media, mediaItems);
    }
  };

  // Update carousel position
  useEffect(() => {
    if (trackRef.current && !isDragging) {
      trackRef.current.style.transform = `translateX(-${currentIndex * (100 / itemsPerView)}%)`;
    }
  }, [currentIndex, itemsPerView, isDragging]);

  if (isLoading) {
    return (
      <div className="card-gradient rounded-3xl p-6 shadow-lg">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[hsl(var(--hot-pink))] border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (mediaItems.length === 0) {
    return (
      <div className="card-gradient rounded-3xl p-6 shadow-lg">
        <div className="text-center">
          <ImageIcon className="w-16 h-16 text-[hsl(var(--hot-pink))]/60 mx-auto mb-4" />
          <p className="text-[hsl(var(--hot-pink))]/80 font-medium">
            No media found for {friendName}
          </p>
        </div>
      </div>
    );
  }

  const displayName = friendName;
  const ruthvikaName = nicknameForRuthvika || 'Ruthvika';

  return (
    <div className="card-gradient rounded-3xl p-6 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-[hsl(var(--hot-pink))] mb-2">
          📸 Memories from {displayName}
        </h3>
      </div>

      {/* Carousel */}
      <div 
        ref={carouselRef}
        className={`relative overflow-hidden rounded-2xl bg-white/50 ${mediaItems.length === 1 ? 'p-2' : 'p-4'}`}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <div 
          ref={trackRef}
          className={`flex transition-transform duration-500 ease-in-out gap-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ 
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {mediaItems.map((media, index) => (
            <div
              key={index}
              className={`flex-shrink-0 ${
                itemsPerView === 1 ? 'w-full' : 'w-1/2'
              }`}
            >
              <div 
                className="media-carousel-item group cursor-pointer"
                onClick={() => handleMediaClick(media)}
              >
                {media.type === 'image' ? (
                  <div className={`w-full ${mediaItems.length === 1 ? 'h-80' : 'h-64'} bg-white/50 flex items-center justify-center`}>
                    <img
                      src={media.src}
                      alt={`Memory from ${displayName}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <div className={`w-full ${mediaItems.length === 1 ? 'h-80' : 'h-64'} bg-white/50 flex items-center justify-center`}>
                      <video
                        src={media.src}
                        className="max-w-full max-h-full object-contain"
                        muted
                        playsInline
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                      <Play className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="media-carousel-overlay">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white/80 text-sm">
                      {media.type === 'image' ? 'Click to view' : 'Click to play'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {mediaItems.length > itemsPerView && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-[hsl(var(--hot-pink))]/30 text-[hsl(var(--hot-pink))] hover:text-[hsl(var(--hot-pink))] shadow-lg"
              onClick={prevSlide}
              aria-label="Previous media"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-[hsl(var(--hot-pink))]/30 text-[hsl(var(--hot-pink))] hover:text-[hsl(var(--hot-pink))] shadow-lg"
              onClick={nextSlide}
              aria-label="Next media"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {mediaItems.length > itemsPerView && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(mediaItems.length / itemsPerView) }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[hsl(var(--hot-pink))] scale-125' 
                  : 'bg-[hsl(var(--hot-pink))]/40 hover:bg-[hsl(var(--hot-pink))]/60'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}