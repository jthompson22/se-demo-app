import { Avatar } from './Avatar';
import { SocialHandles } from './SocialHandles';
import { SubNav } from './SubNav';

export function BlogHeader() {
  return (
    <div className="flex flex-col items-center justify-center border-b border-primary/20 pb-4 mb-4">
      <div className="flex flex-row items-center justify-center gap-2">
        <Avatar rotation="right" />
        <div className="flex flex-col items-center justify-center space-y-3">
          <h1 className="text-4xl font-bold text-foreground">Jared Thompson</h1>
          <p className="text-sm text-muted-foreground">
            Writing and hacking about technology.
          </p>
          <SocialHandles twitter="thompsonj22" linkedin="thompsonj222" />
          <SubNav />
        </div>
        <Avatar rotation="left" />
      </div>
    </div>
  );
}
