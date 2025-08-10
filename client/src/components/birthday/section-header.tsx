interface SectionHeaderProps {
  title: string;
  subtitle: string;
  emoji: string;
}

export function SectionHeader({ title, subtitle, emoji }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12">
      <h3 className="font-dancing text-4xl md:text-5xl text-gradient mb-4 flex items-center justify-center gap-3">
        {emoji} {title} {emoji}
      </h3>
      <p className="text-gray-600 text-lg">{subtitle}</p>
    </div>
  );
}
