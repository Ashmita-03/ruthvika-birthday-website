import { useState } from 'react';
import { useMediaFiles } from '@/hooks/use-media-files';
import { MediaCarousel } from './media-carousel';
import { MediaLightbox } from './media-lightbox';
import { SectionHeader } from './section-header';
import { Card, CardContent } from '@/components/ui/card';
import { ImageIcon } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  filename: string;
}

interface MemoryDumpSectionProps {
  organizedData?: {
    photoGallery: Array<{ 
      content: string; 
      sender: string; 
      nicknameGiven?: string; 
      nicknameForRuthvika?: string; 
    }>;
  };
}

export function MemoryDumpSection({ organizedData }: MemoryDumpSectionProps) {
  const { mediaFiles, isLoading } = useMediaFiles();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<MediaItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleMediaClick = (media: MediaItem, allMedia: MediaItem[]) => {
    setLightboxMedia(allMedia);
    setLightboxIndex(allMedia.indexOf(media));
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxMedia([]);
    setLightboxIndex(0);
  };

  // Get nicknames from organized data with better matching
  const getNicknames = (friendName: string) => {
    // Try exact match first
    let photoData = organizedData?.photoGallery?.find(item => 
      item.sender.toLowerCase() === friendName.toLowerCase()
    );
    
    // If no exact match, try partial matching
    if (!photoData) {
      photoData = organizedData?.photoGallery?.find(item => 
        item.sender.toLowerCase().includes(friendName.toLowerCase()) || 
        friendName.toLowerCase().includes(item.sender.toLowerCase())
      );
    }
    
    // Name variations and common nicknames
    if (!photoData) {
      const nameVariations: { [key: string]: string[] } = {
        'ashmita': ['ashmi', 'ashmita'],
        'ashmi': ['ashmita', 'ashmi'],
        'deetya': ['deetyaa', 'deetya'],
        'deetyaa': ['deetya', 'deetyaa'],
        'jason': ['jay', 'jason'],
        'jay': ['jason', 'jay'],
        'krashanya': ['krash', 'krashanya'],
        'krash': ['krashanya', 'krash'],
        'rithikaa': ['rithika', 'rithikaa'],
        'rithika': ['rithikaa', 'rithika'],
        'suhas': ['suhas', 'suhass'],
        'sharvesh': ['sharvesh', 'sharv'],
        'yashwanth': ['yashwanth', 'yash'],
        'pradeepa': ['pradeepa', 'pradeep']
      };
      
      const variations = nameVariations[friendName.toLowerCase()] || [];
      for (const variation of variations) {
        photoData = organizedData?.photoGallery?.find(item => 
          item.sender.toLowerCase().includes(variation) || 
          variation.includes(item.sender.toLowerCase())
        );
        if (photoData) break;
      }
    }
    
    // If still no match, search all form data for any references
    if (!photoData) {
      const allFormData = [
        ...(organizedData?.heartMessages || []),
        ...(organizedData?.memoryLane || []),
        ...(organizedData?.personalMeaning || []),
        ...(organizedData?.futurePredictions || []),
        ...(organizedData?.lifeAdvice || []),
        ...(organizedData?.finalNotes || [])
      ];
      
      photoData = allFormData.find(item => 
        item.sender.toLowerCase().includes(friendName.toLowerCase()) || 
        friendName.toLowerCase().includes(item.sender.toLowerCase())
      );
    }
    
    return {
      nicknameGiven: (photoData?.nicknameGiven && photoData.nicknameGiven !== 'No clue') 
        ? photoData.nicknameGiven 
        : friendName,
      nicknameForRuthvika: photoData?.nicknameForRuthvika
    };
  };

  if (isLoading) {
    return (
      <section className="animate-fade-in">
        <SectionHeader 
          title="Memory Dump"
          subtitle="Captured moments of joy and friendship"
          emoji="💾✨"
        />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[hsl(var(--hot-pink))] border-t-transparent"></div>
        </div>
      </section>
    );
  }

  const friendsWithMedia = Object.keys(mediaFiles);

  if (friendsWithMedia.length === 0) {
    return (
      <section className="animate-fade-in">
        <SectionHeader 
          title="Memory Dump"
          subtitle="Captured moments of joy and friendship"
          emoji="💾✨"
        />
        <Card className="card-gradient rounded-3xl shadow-lg">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-16 h-16 text-[hsl(var(--hot-pink))]/60 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[hsl(var(--hot-pink))] mb-2">
              No Media Found
            </h3>
            <p className="text-[hsl(var(--hot-pink))]/80">
              Media files will appear here when uploaded to the project
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="animate-fade-in">
      <SectionHeader 
        title="Memory Dump"
        subtitle="Captured moments of joy and friendship"
        emoji="💾✨"
      />
      
      <div className="space-y-8">
        {friendsWithMedia.map((friendName) => {
          const nicknames = getNicknames(friendName);
          return (
            <MediaCarousel
              key={friendName}
              friendName={friendName}
              nicknameGiven={nicknames.nicknameGiven}
              nicknameForRuthvika={nicknames.nicknameForRuthvika}
              onMediaClick={handleMediaClick}
            />
          );
        })}
      </div>

      <MediaLightbox
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        media={lightboxMedia}
        initialIndex={lightboxIndex}
      />
    </section>
  );
}