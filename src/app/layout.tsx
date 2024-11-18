import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "../app/assets/scss/main.scss"
// import "./globals.css";
import { AuthProvider } from "./Providers";
import NavBar from "./cmps/nav-bar/NavBar";
import StoreProvider from "./StoreProvider";
import { UserMsg2 } from "./cmps/UserMsg2";
const varelaRound = Varela_Round ({ weight:'400',subsets: ["hebrew"] });

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
    
    <StoreProvider >
    <html lang="en" style={{height:`100%`}}>
      <body className={`${varelaRound.className} main-layout`}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
                      <UserMsg2/>
      </body>
    </html>
  
    </StoreProvider>
  );
}
