import Image from "next/image";
import Link from "next/link";
import AboutMeIndex from "./cmps/home/AboutMeIndex";
import DirectionsToYayaYoga from "./cmps/home/DirectionsToYayaYoga";
import BillboardIndex from "./cmps/home/BillboardIndex";
import YogaImage from "../../public/4.jpg"
import weeklySchduleImage from "../../public/weekly_schdule_image.png"
import { Open_Sans } from "next/font/google";
const open_Sans = Open_Sans ({ weight:'400',subsets: ["hebrew"] });

export default async function Home() {

  return (


    <>
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

      <main className="home-page-container flex-col full" >
        <section className={`quote-container ${open_Sans.className} gc2`}>
          <p className='patangeli-quote'><span className="quotaion-mark">״</span>אך אימון זה מכה שורש כשהוא מבוצע כראוי, בהתמדה ולאורך זמן״</p>
          <p className='patangeli-quote-credit'>-פטנג׳לי, בתרגומה של אורית סן גופטה</p>

        </section>

        <BillboardIndex />

        {/* <section className='weekly-schedule-image-conatiner '>
             <h2 className="healine tac">שיעורי הסטודיו</h2>
          <Link className="weekly-schedule-button" href={'/weekly_schedule'}>
            <Image className='weekly-schedule-image'
              style={{ objectFit:'cover', width: '100%', height: '100%' }}
              quality={90} src={weeklySchduleImage}
              sizes="100vw"
              width={0}
              height={0}
              placeholder="blur"
              alt={'this mounth event image'} />
           
            <p className="for-signup-txt flex-jc-ac">להרשמה לשיעורים </p>

          
          </Link>
        </section>
         */}
        <AboutMeIndex />
        <DirectionsToYayaYoga />

      </main>
    </>

  );
}
