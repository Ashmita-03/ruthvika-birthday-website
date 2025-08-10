export function AnimatedBackground() {
  // Create horizontal flowing heart elements with even spacing - both directions
  const flowingElements = Array.from({ length: 60 }, (_, i) => (
    <div
      key={`flowing-${i}`}
      className={`flowing-element ${i % 2 === 0 ? '' : 'reverse'}`}
      style={{
        top: `${(i * 37) % 100}%`, // More evenly distributed vertical positions
        animationDelay: `${(i * 0.3) % 8}s`, // More evenly distributed delays
        animationDuration: `${4 + (i % 4)}s`, // Consistent duration variations
      }}
    />
  ));

  // Create blooming hearts with better distribution
  const bloomingHearts = Array.from({ length: 40 }, (_, i) => (
    <div
      key={`heart-${i}`}
      className="blooming-heart"
      style={{
        top: `${(i * 23) % 100}%`, // Better vertical distribution
        left: `${(i * 31) % 100}%`, // Better horizontal distribution
        animationDelay: `${(i * 0.4) % 6}s`, // More evenly spaced delays
        animationDuration: `${3 + (i % 3)}s`, // Consistent duration variations
      }}
    />
  ));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Horizontal flowing elements with twinkling */}
      {flowingElements}
      
      {/* Blooming hearts */}
      {bloomingHearts}
    </div>
  );
}