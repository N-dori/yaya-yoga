import Link from 'next/link';
import React from 'react'

type Props = {}

export default function page({params}) {
    console.log('params.userIdForQuestionnaire',params.userId);

  return (
    <main className='welcome-container gc2 flex-col'>
    <p> כמו כן כדי להתאים בעבורך הנחיות לתרגול נכון אשמח שתקדיש/י מספר דקות למלא שאלון קצר </p>
    <p> לנוחיתך אפשר לדלג על מילוי השאלון כעת, ותמיד תוכל/י לחזור ולמלאו תחת האזור האישי</p>
    <div className='flex-sb gap1'>
    <Link className='transition-btn' href={`/userQuestionnaire/${params.userId}`}>  למילוי השאלון עכשיו</Link>
    <Link className='transition-btn' href='/'>  תודה לא עכשיו </Link>

    </div>
</main>  )
}