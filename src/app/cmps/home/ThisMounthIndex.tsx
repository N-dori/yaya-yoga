import Image from 'next/image'
import React from 'react'

type Props = {}

export default function ThisMounthIndex({ }: Props) {
  return (
    <section className='this-mounth-index-container  flex-col gap1'>

      <article className='this-mount-wrapper'>
        <h2 className='headline tac'> ארועי החודש בסטודיו</h2>
        <h3 className='this-mounth-event-title'>שבת קהילתי - מפגשי חורף </h3>
        <h5 className='this-mounth-event-date'>11/12 , 14/12 , 28/12</h5>
        <div className='image-conatiner flex-ac-jc'>
          <Image className='this-mounth-event-image'
            style={{ width: '100%', height: '100%' }}
            quality={90} src={'/this-month.jpeg'}
            sizes="100vw"
            width={0}
            height={0}
            alt={'this mounth event image'} />

        </div>
        <p className='this-mounth-event-desc p-1 ' >מוסיפים שיעור חדש למערכת!</p>

        <p className='this-mounth-event-desc '>  נעים להכיר אני טלי 🧡
        מורה לויניאסה, תנועה וספורטתרפיסטית, מתרגלת אצל יאיר בשנתיים האחרונות.    </p>

       <p className='this-mounth-event-desc'>    מזמינה אתכםן אחת לשבועיים בשבת בבוקר להיפגש לתרגול ויניאסה– תנועה זורמת בסנכרון עם הנשימה.

          בתרגול נפגוש את האתגר בשמירה על פתיחות וגמישות בתוך רגעים לא מוכרים, נישאר נינוחים ויציבים עם הנשימה בתנועה המשתנה.

          מחכה לפגוש אתכםן🪷
    </p>
      </article>

      <article className='this-mount-wrapper'>
        <h3 className='this-mounth-event-title'>חג חנוכה שמח </h3>
        <h5 className='this-mounth-event-date'> יום רביעי 1/1/25 לא יתקיים שיעור</h5>
        <div className='image-conatiner flex-ac-jc'>
          <Image className='this-mounth-event-image'
            style={{ width: '100%', height: '100%' }}
            quality={90} src={'/hanukah.jpg'}
            sizes="100vw"
            width={0}
            height={0}
            alt={'this mounth event image'} />

        </div>
      </article>
    </section>
  )
}