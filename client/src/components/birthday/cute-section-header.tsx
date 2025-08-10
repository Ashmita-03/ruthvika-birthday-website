import { Badge } from '@/components/ui/badge';

interface CuteSectionHeaderProps {
  title: string;
  subtitle: string;
  emoji: string;
  variant?: 'future' | 'advice';
}

export function CuteSectionHeader({ title, subtitle, emoji, variant = 'future' }: CuteSectionHeaderProps) {
  const isAdvice = variant === 'advice';
  
  return (
    <div className="text-center mb-12">
      <div className="relative inline-block">
        {/* Decorative circles */}
        <div className="absolute -left-8 -top-2 w-6 h-6 bg-[hsl(var(--pastel-pink))] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -right-8 -top-2 w-6 h-6 bg-[hsl(var(--soft-pink))] rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        {/* Main header */}
        <div className={`relative px-8 py-6 rounded-3xl ${
          isAdvice 
            ? 'bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100'
            : 'bg-gradient-to-r from-pink-100 via-rose-100 to-pink-100'
        } border-2 border-[hsl(var(--pastel-pink))] shadow-lg`}>
          
          {/* Side decorative elements */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2">
            <Badge className="bg-[hsl(var(--hot-pink))] text-white px-3 py-1 text-lg rotate-12 shadow-lg">
              {emoji.split(' ')[0]}
            </Badge>
          </div>
          
          <div className="absolute -right-3 top-1/2 -translate-y-1/2">
            <Badge className="bg-[hsl(var(--soft-pink))] text-white px-3 py-1 text-lg -rotate-12 shadow-lg">
              {emoji.split(' ')[1] || '✨'}
            </Badge>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--hot-pink))] mb-2 font-poppins">
            {title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-[hsl(var(--hot-pink))]/80 text-sm md:text-base font-medium">
            {subtitle}
          </p>
          
          {/* Bottom decorative dots */}
          <div className="flex justify-center mt-4 gap-2">
            <div className="w-2 h-2 bg-[hsl(var(--hot-pink))] rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[hsl(var(--pastel-pink))] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-2 bg-[hsl(var(--soft-pink))] rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute -top-4 left-1/4 text-2xl animate-float">🌟</div>
        <div className="absolute -bottom-4 right-1/4 text-2xl animate-float" style={{ animationDelay: '1s' }}>💫</div>
      </div>
    </div>
  );
}