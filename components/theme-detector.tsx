// import { cookies } from 'next/headers'

// export function ThemeDetector() {
//   const cookieStore = cookies()
//   const theme = await cookieStore.get('theme')
//   return (
//     <script
//       dangerouslySetInnerHTML={{
//         __html: `
//           (function() {
//             document.documentElement.classList.${theme?.value === 'dark' ? 'add' : 'remove'}('dark');
//           })();
//         `,
//       }}
//     />
//   )
// }
