import { useState } from 'react';

interface PhotoCardProps {
  url: string;
  sender: string;
  nicknameGiven?: string;
  nicknameForRuthvika?: string;
}

export function PhotoCard({ url, sender, nicknameGiven, nicknameForRuthvika }: PhotoCardProps) {
  const [imageError, setImageError] = useState(false);

  if (!url || imageError) return null;

  return (
    <div className="card-gradient rounded-2xl p-4 shadow-lg hover-lift animate-fade-in">
      <img 
        src={url}
        alt={`Memory shared by ${sender}`}
        className="w-full h-48 object-cover rounded-xl mb-3"
        loading="lazy"
        onError={() => setImageError(true)}
      />
      <p className="text-sm text-[hsl(var(--hot-pink))] font-medium text-center">
        From {sender} 💕
      </p>
    </div>
  );
}
