import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Sparkles, Crown } from 'lucide-react';

interface FuturePredictionsCardProps {
  content: string;
  sender: string;
  nicknameGiven?: string;
  nicknameForRuthvika?: string;
  showNicknames?: boolean;
}

export function FuturePredictionsCard({ 
  content, 
  sender, 
  nicknameGiven, 
  nicknameForRuthvika, 
  showNicknames = false 
}: FuturePredictionsCardProps) {
  const displayName = showNicknames && nicknameGiven ? nicknameGiven : sender;
  const ruthvikaName = showNicknames && nicknameForRuthvika ? nicknameForRuthvika : 'Ruthvika';

  return (
    <Card className="card-gradient rounded-3xl shadow-lg hover-lift group overflow-hidden relative">
      {/* Decorative stars */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <Star className="w-6 h-6 text-[hsl(var(--hot-pink))] animate-pulse" />
      </div>
      <div className="absolute top-8 right-8 opacity-15 group-hover:opacity-30 transition-opacity">
        <Sparkles className="w-4 h-4 text-[hsl(var(--pastel-pink))] animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-rose-100/20 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardContent className="p-8 relative z-10">
        {/* Header with crown icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full">
            <Crown className="w-5 h-5 text-[hsl(var(--hot-pink))]" />
          </div>
        </div>
        
        {/* Content */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border-l-4 border-[hsl(var(--pastel-pink))]">
            <p className="text-gray-700 text-lg leading-relaxed font-medium italic">
              "{content}"
            </p>
          </div>
        </div>
        
        {/* Sender info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[hsl(var(--hot-pink))] rounded-full"></div>
            <span className="text-[hsl(var(--hot-pink))] font-semibold">
              Prediction by {displayName}
            </span>
          </div>
          <div className="text-2xl" style={{ color: '#ff1493' }}>🔮</div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-6 flex justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-[hsl(var(--pastel-pink))] rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-[hsl(var(--soft-pink))] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-[hsl(var(--hot-pink))] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}