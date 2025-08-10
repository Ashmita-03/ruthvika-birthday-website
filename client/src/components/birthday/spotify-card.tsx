interface SpotifyCardProps {
  url: string;
  sender: string;
  nicknameGiven?: string;
  nicknameForRuthvika?: string;
}

export function SpotifyCard({ url, sender, nicknameGiven, nicknameForRuthvika }: SpotifyCardProps) {
  if (!url || !url.includes('spotify')) return null;

  // Extract Spotify track ID from various URL formats
  let trackId = '';
  if (url.includes('track/')) {
    trackId = url.split('track/')[1].split('?')[0];
  } else if (url.includes('spotify:track:')) {
    trackId = url.split('spotify:track:')[1];
  }

  if (!trackId) return null;

  return (
    <div className="card-gradient rounded-3xl p-6 shadow-xl hover-lift animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--pastel-pink))] to-[hsl(var(--soft-pink))] rounded-full flex items-center justify-center text-white font-bold text-lg">
          {sender.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 className="font-semibold text-[hsl(var(--hot-pink))] text-lg">
            {sender}
          </h4>
          <p className="text-sm text-gray-500">shared a song for you 🎵</p>
        </div>
      </div>
      <div className="spotify-embed">
        <iframe 
          src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator`}
          width="100%" 
          height="152" 
          frameBorder="0" 
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="rounded-xl"
        />
      </div>
    </div>
  );
}
