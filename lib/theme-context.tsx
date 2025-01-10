// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// type Theme = 'light' | 'dark';

// type ThemeContextType = {
//   theme: Theme;
//   toggleTheme: () => void;
// };

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const [theme, setTheme] = useState<Theme>('light');
//   const router = useRouter();

//   useEffect(() => {
//     const savedTheme = document.documentElement.classList.contains('dark')
//       ? 'dark'
//       : 'light';
//     setTheme(savedTheme);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     document.documentElement.classList.toggle('dark');
//     document.cookie = `theme=${newTheme}; path=/; max-age=31536000; SameSite=Strict`;
//     router.refresh();
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// }
