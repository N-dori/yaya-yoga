import Image from "next/image";

export default function Home() {

  return (
    <main className={"home-page-container flex-jc-ac flex-col full"} >
    <section className="hero-container">

      <Image className='hero' src={'/1.jpg'}
       width={370} height={300}
        layout="responsive"
       quality={90} alt="image of yoga class"/>
       
    </section>

      
      <h1 className="tac"> ברוכים הבאים </h1>
      <h2 className="tac"> יאיא יוגה</h2>
    </main>
  );
}
