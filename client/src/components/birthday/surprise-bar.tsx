import { useEffect, useState } from 'react';

export function SurpriseBar() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass-effect text-center py-3 px-4 animate-slide-down">
      <p className="text-[hsl(var(--hot-pink))] font-medium">
        ✨ Dive into your digital birthday time capsule! 🎂 Happy 18th, Ruthvika! This one's from all of us ❤️
      </p>
    </div>
  );
}
