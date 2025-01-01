"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Long Form", path: "/" },
  { name: "Snippets", path: "/snippets" },
  { name: "Store", path: "/store" },
  { name: "Photos", path: "/photos" },
  { name: "About Me", path: "/about" },
];

export function SubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 items-center justify-center">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`text-md transition-colors hover:text-primary ${
            pathname === item.path
              ? "text-primary font-medium"
              : "text-muted-foreground"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
