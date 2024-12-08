import Image from "next/image";
import Link from "next/link";
import AboutMeIndex from "./cmps/home/AboutMeIndex";
import DirectionsToYayaYoga from "./cmps/home/DirectionsToYayaYoga";
import BillboardIndex from "./cmps/home/BillboardIndex";

export default async function Home() {

  return (


    <>
      <section className="hero-container flex-col full gap2">

        <Image className='hero' src={'/4.jpg'}
          style={{ width: '100%', height: '100%' }}
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

      <main className="home-page-container flex-col gap1 gc2" >

        <BillboardIndex />

        <section className='weekly-schedule-image-conatiner flex-ac-jc'>
          <Link className="weekly-schedule-button" href={'/weekly_schedule'}>
            <Image className='weekly-schedule-image'
              style={{ width: '100%', height: '100%' }}
              quality={90} src={'/weekly_schdule_image.png'}
              sizes="100vw"
              width={0}
              height={0}
              alt={'this mounth event image'} />
            <p className="for-signup-txt flex-jc-ac">להרשמה לשיעורים לחצו כאן</p>
          </Link>
        </section>

        <AboutMeIndex />
        <DirectionsToYayaYoga />

      </main>
    </>

  );
}
