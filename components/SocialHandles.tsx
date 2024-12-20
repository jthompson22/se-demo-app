import Link from 'next/link';
import Image from 'next/image';

interface SocialHandlesProps {
  twitter?: string;
  linkedin?: string;
}

export function SocialHandles({ twitter, linkedin }: SocialHandlesProps) {
  return (
    <div className="flex items-center gap-4">
      {twitter && (
        <Link
          href={`https://twitter.com/${twitter}`}
          className="text-muted-foreground hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/x-social-media-logo-icon.svg"
            alt="X (Twitter) Profile"
            width={30}
            height={30}
            className="dark:invert"
          />
        </Link>
      )}
      {linkedin && (
        <Link
          href={`https://linkedin.com/in/${linkedin}`}
          className="text-muted-foreground hover:opacity-80 transition-opacity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/linkedin-app-icon.svg"
            alt="LinkedIn Profile"
            width={30}
            height={30}
          />
        </Link>
      )}
    </div>
  );
}
