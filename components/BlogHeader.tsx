import { Avatar } from './Avatar';
import { SocialHandles } from './SocialHandles';

export function BlogHeader() {
  return (
    <div className="flex flex-row items-center justify-center gap-2 border-b border-primary/20 mb-6">
      <Avatar rotation="right" />
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">Jared Thompson</h1>
        <p className="text-sm text-muted-foreground">
          Writing and hacking about technology.
        </p>
        <SocialHandles twitter="thompsonj22" linkedin="thompsonj222" />
      </div>
      <Avatar rotation="left" />
    </div>
  );
}
