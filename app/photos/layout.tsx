/*
  Uses Next.js Parallel Routes
*/

export default function Layout({
  children,
  sanityPhotos,
  publicPhotos,
}: {
  children: React.ReactNode;
  sanityPhotos: React.ReactNode;
  publicPhotos: React.ReactNode;
}) {
  return (
    <div className="container mx-auto">
      {children}
      <div className="flex flex-row gap-4">
        <div className="w-1/2">{sanityPhotos}</div>
        <div className="w-1/2">{publicPhotos}</div>
      </div>
    </div>
  );
}
