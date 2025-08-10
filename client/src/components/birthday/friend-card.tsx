interface FriendCardProps {
  content: string;
  sender: string;
  nicknameGiven?: string;
  nicknameForRuthvika?: string;
  showNicknames?: boolean;
}

export function FriendCard({ content, sender, nicknameGiven, nicknameForRuthvika, showNicknames = false }: FriendCardProps) {
  if (!content || content.trim() === '') return null;

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
          <div className="flex gap-1">
            <span className="text-sm">💕</span>
            <span className="text-sm">💕</span>
            <span className="text-sm">💕</span>
          </div>
        </div>
      </div>
      <div className="text-gray-700 leading-relaxed">
        {content}
        
        {/* Add nicknames only when showNicknames is true */}
        {showNicknames && (
          <>
            {/* Add nickname for Ruthvika at the end */}
            {nicknameForRuthvika && (
              <div className="mt-4 pt-3 border-t border-pink-200">
                <p className="text-[hsl(var(--hot-pink))] font-medium italic">
                  Nickname for you: {nicknameForRuthvika}
                </p>
              </div>
            )}
            
            {/* Add nickname given by Ruthvika */}
            {nicknameGiven && (
              <div className="mt-2">
                <p className="text-[hsl(var(--hot-pink))] font-medium italic text-sm">
                  -Yours {nicknameGiven}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
