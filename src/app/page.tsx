import Image from "next/image";
import Link from "next/link";
import AboutMeIndex from "./cmps/home/AboutMeIndex";
import DirectionsToYayaYoga from "./cmps/home/DirectionsToYayaYoga";
import BillboardIndex from "./cmps/home/BillboardIndex";
import YogaImage from "../../public/4.jpg"
import { Open_Sans } from "next/font/google";

const open_Sans = Open_Sans ({ weight:'400',subsets: ["hebrew"] });

export default async function Home() {




  return (


    <>
       <main className="home-page-container flex-col full" >
      <section className="hero-container flex-col full gap2">

        <Image className='hero' src={YogaImage}
          style={{ width: '100%', height: '100%' }}
          sizes="100vw"
          width={0}
          height={0}
          quality={90} alt="image of yoga class" 
          placeholder="blur"/>

        <section className="welcome-conteiner flex-col flex-ac">
          <h1 className="welcome-txt tac"> ברוכים הבאים </h1>
          <h3 className="yaya-yoga tac">YAYA-YOGA</h3>
          <Link href={'/weekly_schedule'} className="signup-to-class-btn " >הרשמה לשיעורים</Link>
        </section>
      </section>
        <section className="grid who-are-we-continer gap2">

        <section className={`quote-container ${open_Sans.className} `}>
          <p className='patangeli-quote'><span className="quotaion-mark">״</span>אך אימון זה מכה שורש כשהוא מבוצע כראוי, בהתמדה ולאורך זמן״</p>
          <p className='patangeli-quote-credit'>-פטנג׳לי, בתרגומה של אורית סן גופטה</p>

        </section>
        <p className={`who-are-we `}>יאיא יוגה הוא סטודיו ייחודי המוקדש למסורת האשטנגה יוגה, ומציע מגוון רחב של שיעורים המתאימים ליוגים בכל הרמות. הסטודיו מהווה מקום מפגש לקהילה אוהבת יוגה, עם אווירה חמה ומזמינה, שמזמינה לתרגול, חיבור והתפתחות אישית.</p>
        </section>

        <BillboardIndex />

        <AboutMeIndex />
        <DirectionsToYayaYoga />

      </main>
    </>

  );
}
