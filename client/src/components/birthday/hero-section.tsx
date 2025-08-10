import { useConfetti } from '@/hooks/use-confetti';

export function HeroSection() {
  const { triggerConfetti } = useConfetti();

  return (
    <div className="text-center mb-16 animate-fade-in">
      <div className="relative flex items-center justify-center mb-4 px-4">
        <h1 className="font-dancing text-4xl sm:text-5xl md:text-7xl text-[hsl(var(--hot-pink))] animate-bounce-gentle text-center">
          Happy 18th Birthday Ruthvika!!
        </h1>
        
        {/* Birthday Balloon Button */}
        <div className="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
          <button
            onClick={triggerConfetti}
            className="hover:scale-110 active:scale-95 transition-transform duration-300 animate-float"
            aria-label="Click for confetti celebration"
          >
          <svg
            width="50"
            height="65"
            viewBox="0 0 60 80"
            className="w-10 h-13 sm:w-12 sm:h-16 md:w-14 md:h-18 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
          >
            {/* Balloon */}
            <ellipse
              cx="30"
              cy="25"
              rx="20"
              ry="25"
              fill="url(#balloonGradient)"
              stroke="#ff69b4"
              strokeWidth="2"
            />
            {/* Balloon highlight */}
            <ellipse
              cx="25"
              cy="18"
              rx="6"
              ry="8"
              fill="rgba(255,255,255,0.4)"
            />
            {/* String */}
            <line
              x1="30"
              y1="50"
              x2="30"
              y2="75"
              stroke="#ff69b4"
              strokeWidth="2"
            />
            {/* String curl */}
            <path
              d="M 30 75 Q 35 77 30 79 Q 25 81 30 83"
              fill="none"
              stroke="#ff69b4"
              strokeWidth="2"
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="balloonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffb6c1" />
                <stop offset="50%" stopColor="#ff91a4" />
                <stop offset="100%" stopColor="#ff69b4" />
              </linearGradient>
            </defs>
          </svg>
          </button>
          

          {/* Arrow pointing to the balloon */}
          <svg 
            className="mt-1 w-6 h-6 text-[hsl(var(--hot-pink))] animate-pulse" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
          >
            <path d="M12 5 L12 19" strokeLinecap="round" />
            <path d="M8 9 L12 5 L16 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <div className="mt-1 text-xs text-[hsl(var(--hot-pink))] font-medium bg-white/80 px-2 py-1 rounded-full animate-bounce-gentle">
            click here!
          </div>
        </div>
      </div>
      
      <h2 className="font-poppins text-2xl md:text-3xl text-[hsl(var(--hot-pink))] font-bold mb-6">
        🎂✨ A celebration made by your friends! ✨🎂
      </h2>
      <img 
        src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=400" 
        alt="Birthday celebration decorations" 
        className="rounded-3xl shadow-2xl mx-auto mb-8 w-full max-w-4xl h-64 md:h-80 object-cover animate-float" 
      />
      <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
        Your amazing friends have gathered their most heartfelt wishes, favorite memories, 
        and special songs just for you! 💖
      </p>
    </div>
  );
}
