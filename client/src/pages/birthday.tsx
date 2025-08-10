import { useEffect } from 'react';
import { useBirthdayData } from '@/hooks/use-birthday-data';
import { useConfetti } from '@/hooks/use-confetti';
import { LoadingOverlay } from '@/components/birthday/loading-overlay';
import { SurpriseBar } from '@/components/birthday/surprise-bar';
import { AnimatedBackground } from '@/components/birthday/animated-background';
import { HeroSection } from '@/components/birthday/hero-section';
import { SectionHeader } from '@/components/birthday/section-header';
import { FriendCard } from '@/components/birthday/friend-card';
import { SpotifyCard } from '@/components/birthday/spotify-card';
import { PhotoCard } from '@/components/birthday/photo-card';
import { MemoryDumpSection } from '@/components/birthday/memory-dump-section';
import { FuturePredictionsCard } from '@/components/birthday/future-predictions-card';
import { CuteSectionHeader } from '@/components/birthday/cute-section-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function BirthdayPage() {
  const { data: organizedData, isLoading, error, refetch } = useBirthdayData();
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    if (organizedData && !isLoading) {
      const timer = setTimeout(() => {
        triggerConfetti();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [organizedData, isLoading, triggerConfetti]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-16 w-16 text-[hsl(var(--hot-pink))] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[hsl(var(--hot-pink))] mb-4">
              Oops! Something went wrong
            </h3>
            <p className="text-gray-600 mb-6">
              We couldn't load your birthday surprises right now. Please try refreshing the page!
            </p>
            <Button 
              onClick={() => refetch()} 
              className="bg-[hsl(var(--hot-pink))] hover:bg-[hsl(var(--hot-pink))]/90"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sections = [
    {
      id: 'heartMessages',
      title: 'From the Heart',
      subtitle: 'Sweet wishes straight from the heart',
      emoji: '💌',
      data: organizedData?.heartMessages || [],
      component: FriendCard,
      gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    },
    {
      id: 'memoryLane',
      title: 'A Trip Down Memory Lane',
      subtitle: 'Cherished moments you\'ve shared together',
      emoji: '✨🚶‍♀️',
      data: organizedData?.memoryLane || [],
      component: FriendCard,
      gridCols: 'grid-cols-1 md:grid-cols-2'
    },
    {
      id: 'musicVibes',
      title: 'Your Vibe, Our Pick',
      subtitle: 'Songs that remind them of you',
      emoji: '🎶',
      data: organizedData?.musicVibes || [],
      component: SpotifyCard,
      gridCols: 'grid-cols-1 md:grid-cols-2'
    },
    {
      id: 'photoGallery',
      title: 'Memory Dump',
      subtitle: 'Captured moments of joy and friendship',
      emoji: '💾✨',
      data: organizedData?.photoGallery || [],
      component: PhotoCard,
      gridCols: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    },
    {
      id: 'personalMeaning',
      title: 'The Magic She Brings',
      subtitle: 'Why she means a lot to you',
      emoji: '🪄',
      data: organizedData?.personalMeaning || [],
      component: FriendCard,
      gridCols: 'grid-cols-1 md:grid-cols-2'
    },
    {
      id: 'futurePredictions',
      title: '10 Years Later... 👀 Ruthvika in 2035',
      subtitle: 'What your friends see in your bright future',
      emoji: '👩‍💼 🌍',
      data: organizedData?.futurePredictions || [],
      component: FuturePredictionsCard,
      gridCols: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      useCustomHeader: true,
      headerVariant: 'future'
    },
    {
      id: 'lifeAdvice',
      title: 'Ruthvika, Read This When Adulting Gets Hard',
      subtitle: 'Encouragement and words of wisdom',
      emoji: '💪 ✨',
      data: organizedData?.lifeAdvice || [],
      component: FriendCard,
      gridCols: 'grid-cols-1 md:grid-cols-2',
      useCustomHeader: true,
      headerVariant: 'advice'
    },
    {
      id: 'finalNotes',
      title: 'Before You Go…',
      subtitle: 'Any final message or notes',
      emoji: '📝',
      data: organizedData?.finalNotes || [],
      component: FriendCard,
      gridCols: 'grid-cols-1 md:grid-cols-2'
    }
  ];

  return (
    <div className="font-poppins gradient-bg min-h-screen">
      <AnimatedBackground />
      <SurpriseBar />
      
      <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
        <HeroSection />
        
        <div className="space-y-16">
          {sections.map((section) => {
            const Component = section.component;
            const hasData = section.data.length > 0;
            
            // Handle Memory Dump section specially
            if (section.id === 'photoGallery') {
              return (
                <MemoryDumpSection 
                  key={section.id}
                  organizedData={organizedData}
                />
              );
            }
            
            if (!hasData) return null;
            
            return (
              <section key={section.id} className="animate-fade-in">
                {(section as any).useCustomHeader ? (
                  <CuteSectionHeader 
                    title={section.title}
                    subtitle={section.subtitle}
                    emoji={section.emoji}
                    variant={(section as any).headerVariant}
                  />
                ) : (
                  <SectionHeader 
                    title={section.title}
                    subtitle={section.subtitle}
                    emoji={section.emoji}
                  />
                )}
                <div className={`grid ${section.gridCols} gap-8`}>
                  {section.data.map((item, index) => {
                    const key = `${section.id}-${index}`;
                    const baseProps = {
                      content: item.content,
                      sender: item.sender,
                      nicknameGiven: item.nicknameGiven,
                      nicknameForRuthvika: item.nicknameForRuthvika
                    };
                    
                    if (section.id === 'musicVibes') {
                      return (
                        <Component 
                          key={key}
                          {...baseProps}
                          url={item.content}
                        />
                      );
                    }
                    
                    // Only show nicknames in the "From the Heart" section
                    const showNicknames = section.id === 'heartMessages';
                    
                    return (
                      <Component 
                        key={key}
                        {...baseProps}
                        showNicknames={showNicknames}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 mt-16">
        <div className="card-gradient rounded-3xl p-6 mx-4 md:mx-auto max-w-md shadow-xl">
          <p className="text-[hsl(var(--hot-pink))] font-medium text-lg">
            Made with ❤️ by Ashmita & AMM Batch
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="text-2xl animate-bounce-gentle">🎉</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.1s' }}>🎂</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>🎈</span>
            <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: '0.3s' }}>✨</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
