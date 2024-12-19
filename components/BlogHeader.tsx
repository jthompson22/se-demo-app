import { Avatar } from './Avatar';

export function BlogHeader() {
  return (
    <div className="flex flex-col items-start gap-4">
      <Avatar />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Jared Thompson</h1>
        <p className="text-sm text-gray-400">
          Writing and hacking about technology
        </p>
      </div>
    </div>
  );
}
