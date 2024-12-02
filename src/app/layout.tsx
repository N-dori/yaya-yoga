import type { Metadata } from "next";
import { Varela_Round } from "next/font/google";
import "../app/assets/scss/main.scss"
// import "./globals.css";
import { AuthProvider } from "./Providers";
import NavBar from "./cmps/nav-bar/NavBar";
import StoreProvider from "./StoreProvider";
import { UserMsg2 } from "./cmps/UserMsg2";
import Image from "next/image";
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
          <section className="hero-container flex-col full gap2">

        <Image className='hero' src={'/4.jpg'}  
          style={{width:'100%',height:'100%'}}
          sizes="100vw"
          width={0}
          height={0}
          quality={90} alt="image of yoga class" />

        <section className="quote-container">
          <p className='patangeli-quote'><span className="quotaion-mark">״</span>אך אימון זה מכה שורש כשהוא מבוצע כראוי, בהתמדה ולאורך זמן״</p>
          <p className='patangeli-quote-credit'>-פטנג׳לי, בתרגומה של אורית סן גופטה</p>

        </section>
        <section className="welcome-conteiner flex-col flex-ac">
          <h1 className="welcome-txt tac"> ברוכים הבאים </h1>
          <h3 className="yaya-yoga tac">YAYA-YOGA</h3>

        </section>
      </section>
          {children}
        </AuthProvider>
                      <UserMsg2/>
      </body>
    </html>
  
    </StoreProvider>
  );
}
