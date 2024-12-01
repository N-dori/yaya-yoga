import Image from "next/image";
import ThisMounthIndex from "./cmps/home/ThisMounthIndex";
import Link from "next/link";

export default function Home() {

  return (
    <main className="home-page-container full" >
    <section className="hero-container">

      <Image className='hero' src={'/4.jpg'}
       width={370} height={300}
        layout="responsive"
       quality={90} alt="image of yoga class"/>
       <section className="quote-container">
       <p className='patangeli-quote'><span className="quotaion-mark">״</span>אך אימון זה מכה שורש כשהוא מבוצע כראוי, בהתמדה ולאורך זמן״</p>
       <p className='patangeli-quote-credit'>-פטנג׳לי, בתרגומה של אורית סן גופטה</p>

       </section>
      <h1 className="welcome-txt tac"> ברוכים הבאים </h1>
      <h3 className="yaya-yoga tac"> יאיא יוגה</h3>
    </section>

      <ThisMounthIndex/>
      <div className='weekly-schedule-image-conatiner flex-ac-jc'>
        <Image className='weekly-schedule-image'
        style={{width:'100%',height:'100%'}}
          quality={90} src={'/weekly_schdule_image.png'}
          sizes="100vw"
          objectFit="cover"
          width={0}
          height={0}
           alt={'this mounth event image'}  />
      <Link className="weekly-schedule-button" href={'/weekly_schedule'}>להרשמה לשיעורים </Link>
      </div>
    </main>
  );
}
