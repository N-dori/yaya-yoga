import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "../app/assets/scss/main.scss"
// import "./globals.css";
import { AuthProvider } from "./Providers";
import NavBar from "./cmps/nav-bar/NavBar";
const fredoka = Fredoka({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "יאיא יוגה",
  description: "סטודיו ליוגה במסורת האשטנגה ",
  // icons:{
  //   icon:['/favicon.ico?v=4'],
  //   apple:['/apple-touch-icon.png?v=4'],
  //   shortcut:['/apple-touch-icon.png']
  // },
  manifest: '/site.webmanifest'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} main-layout`}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
