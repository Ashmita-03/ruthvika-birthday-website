import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Download, ZoomIn, ZoomOut, RotateCw, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  filename: string;
}

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  initialIndex: number;
}

export function MediaLightbox({ isOpen, onClose, media, initialIndex }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setZoom(1);
    setRotation(0);
    setDragOffset({ x: 0, y: 0 });
  }, [initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          previousMedia();
          break;
        case 'ArrowRight':
          nextMedia();
          break;
        case ' ':
          e.preventDefault();
          if (currentMedia.type === 'video') {
            togglePlayPause();
          }
          break;
        case 'r':
        case 'R':
          if (currentMedia.type === 'image') {
            resetTransform();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  const currentMedia = media[currentIndex];
  
  if (!currentMedia) return null;

  const nextMedia = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
    setIsPlaying(false);
    resetTransform();
  };

  const previousMedia = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
    setIsPlaying(false);
    resetTransform();
  };

  const resetTransform = () => {
    setZoom(1);
    setRotation(0);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleImageDragStart = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
  };

  const handleImageDragMove = (e: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;
    setDragOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleImageDragEnd = () => {
    setIsDragging(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoClick = () => {
    togglePlayPause();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentMedia.src;
    link.download = currentMedia.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={lightboxRef}
      className="fixed inset-0 z-50 media-lightbox-backdrop flex items-center justify-center p-8"
      onClick={handleBackdropClick}
    >
      {/* Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          {currentIndex + 1} / {media.length}
        </Badge>
        
        <div className="flex items-center gap-2">
          {currentMedia.type === 'image' && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                className="text-white hover:bg-white/20 hover:text-white"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                className="text-white hover:bg-white/20 hover:text-white"
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRotate}
                className="text-white hover:bg-white/20 hover:text-white"
              >
                <RotateCw className="w-5 h-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={resetTransform}
                className="text-white hover:bg-white/20 hover:text-white"
                title="Reset zoom and rotation"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDownload}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <Download className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 hover:text-white"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Media Display */}
      <div className="relative flex items-center justify-center w-full h-full">
        {/* Previous Button */}
        {media.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={previousMedia}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-10 w-12 h-12"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}

        {/* Media Content */}
        <div className="relative flex items-center justify-center w-full h-full px-16">
          {currentMedia.type === 'image' ? (
            <img
              ref={imageRef}
              src={currentMedia.src}
              alt="Media content"
              className={`max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl transition-transform duration-300 ${
                zoom > 1 ? 'cursor-move' : 'cursor-zoom-in'
              }`}
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
                transformOrigin: 'center'
              }}
              onMouseDown={handleImageDragStart}
              onMouseMove={handleImageDragMove}
              onMouseUp={handleImageDragEnd}
              onMouseLeave={handleImageDragEnd}
              onDoubleClick={zoom > 1 ? resetTransform : handleZoomIn}
            />
          ) : (
            <div className="relative">
              <video
                ref={videoRef}
                src={currentMedia.src}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl cursor-pointer"
                onClick={handleVideoClick}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={false}
                muted={isMuted}
              />
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-black/20 rounded-lg" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayPause}
                  className="text-white hover:bg-white/20 hover:text-white w-16 h-16 z-10"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8" />
                  )}
                </Button>
              </div>

              {/* Video Bottom Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlayPause}
                    className="text-white hover:bg-white/20 hover:text-white w-8 h-8"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    className="text-white hover:bg-white/20 hover:text-white w-8 h-8"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Button */}
        {media.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={nextMedia}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hover:text-white z-10 w-12 h-12"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}
      </div>

      {/* Media Info */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Card className="bg-white/20 border-white/30 text-white">
          <CardContent className="p-3">
            <p className="text-sm font-medium">{currentMedia.filename}</p>
            <p className="text-xs text-white/80">
              {currentMedia.type === 'image' ? 'Image' : 'Video'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dots Indicator */}
      {media.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
          {media.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}