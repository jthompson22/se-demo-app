import Image from 'next/image';

export function Avatar() {
  return (
    <div className="relative h-48 w-48 overflow-hidden rounded-full">
      <Image
        src="/manwalk.gif"
        alt="Animated avatar"
        fill
        className="object-contain scale-x-[-1] dark:invert" // Added scale-x-[-1] to flip horizontally
        priority
      />
    </div>
  );
}
