import Image from "next/image";

export default function Home() {

  return (
    <main className={"home-page-container flex-jc-ac flex-col gc2"} >
      <Image src={'/yoga-classes-in-pitampura-500x500.webp'} width={300} height={300} alt="image of yoga class"/>
      <h1 className="tac"> ברוכים הבאים </h1>
      <h2 className="tac"> יאיא יוגה</h2>
    </main>
  );
}
