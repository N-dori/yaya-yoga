import Image from "next/image";
import ThisMounthIndex from "./cmps/home/ThisMounthIndex";
import Link from "next/link";
import AboutMeIndex from "./cmps/home/AboutMeIndex";
import DirectionsToYayaYoga from "./cmps/home/DirectionsToYayaYoga";

export default function Home() {

  return (
  
    
      
    <main className="home-page-container flex-col gap1 gc2" >

      <ThisMounthIndex/>

      <section className='weekly-schedule-image-conatiner flex-ac-jc'>
      <Link className="weekly-schedule-button" href={'/weekly_schedule'}>
        <Image className='weekly-schedule-image'
        style={{width:'100%',height:'100%'}}
        quality={90} src={'/weekly_schdule_image.png'}
        sizes="100vw"
          width={0}
          height={0}
          alt={'this mounth event image'}  />
      <p className="for-signup-txt flex-jc-ac">להרשמה לשיעורים לחצו כאן</p>
      </Link>
      </section>

      <AboutMeIndex/>
     <DirectionsToYayaYoga/>

    </main>
          
  );
}
