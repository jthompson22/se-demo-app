import Image from 'next/image';

export function Avatar() {
  return (
    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200">
      <Image
        src="/manwalk.gif"
        alt="Animated avatar"
        fill
        className="object-cover dark:invert"
        priority
      />
    </div>
  );
}
