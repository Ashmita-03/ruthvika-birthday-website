import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Flower, Sun, Rainbow } from 'lucide-react';

interface LifeAdviceCardProps {
  content: string;
  sender: string;
  nicknameGiven?: string;
  nicknameForRuthvika?: string;
  showNicknames?: boolean;
}

export function LifeAdviceCard({ 
  content, 
  sender, 
  nicknameGiven, 
  nicknameForRuthvika, 
  showNicknames = false 
}: LifeAdviceCardProps) {
  const displayName = showNicknames && nicknameGiven ? nicknameGiven : sender;
  const ruthvikaName = showNicknames && nicknameForRuthvika ? nicknameForRuthvika : 'Ruthvika';

  return (
    <Card className="card-gradient rounded-3xl shadow-lg hover-lift group overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <Sun className="w-6 h-6 text-orange-400 animate-pulse" />
      </div>
      <div className="absolute top-8 right-8 opacity-15 group-hover:opacity-30 transition-opacity">
        <Flower className="w-4 h-4 text-pink-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute bottom-4 left-4 opacity-10 group-hover:opacity-25 transition-opacity">
        <Rainbow className="w-8 h-8 text-blue-400" />
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 via-pink-100/20 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <CardContent className="p-8 relative z-10">
        {/* Header with heart icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <Badge 
            variant="secondary" 
            className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 border-orange-200"
          >
            💝 For Strong {ruthvikaName}
          </Badge>
        </div>
        
        {/* Content */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border-l-4 border-orange-300">
            <p className="text-gray-700 text-lg leading-relaxed font-medium">
              "{content}"
            </p>
          </div>
        </div>
        
        {/* Sender info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-orange-600 font-semibold">
              Love & support from {displayName}
            </span>
          </div>
          <div className="text-2xl">🌟</div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-6 flex justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-orange-300 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
        
        {/* Cute bottom message */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500 italic">
            Remember, you're amazing! 🌈
          </p>
        </div>
      </CardContent>
    </Card>
  );
}