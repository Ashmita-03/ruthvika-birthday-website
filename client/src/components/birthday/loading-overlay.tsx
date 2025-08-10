export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center gradient-bg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[hsl(var(--hot-pink))] border-t-transparent mx-auto mb-4"></div>
        <p className="text-[hsl(var(--hot-pink))] font-medium text-lg">
          Loading your birthday surprises... 🎁
        </p>
      </div>
    </div>
  );
}
