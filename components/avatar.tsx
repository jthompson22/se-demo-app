import Image from 'next/image';

interface AvatarProps {
  rotation: 'left' | 'right';
}

export function Avatar({ rotation }: AvatarProps) {
  return (
    <div className="relative h-36 w-36 overflow-hidden rounded-full">
      <Image
        src="/manwalk.gif"
        alt="Animated avatar"
        fill
        className={`object-contain dark:invert ${
          rotation === 'left' ? 'scale-x-[-1]' : ''
        }`}
        priority
      />
    </div>
  );
}
