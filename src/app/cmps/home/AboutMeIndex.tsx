import Image from 'next/image'
import React from 'react'
import ParagraphsIndex from '../ParagraphsIndex'
import DynamicImage from '../DynamicImage'

type AboutMeIndexProps = {}
const desc = `
/ אני יאיר שורץ, בן 34, אבא גאה למעיין ובן זוג למורן. מתגורר בקיבוץ משמרות, והיוגה עבורי היא הרבה יותר ממקצוע – היא דרך חיים, חיבור ושקט פנימי. 
        / /את המסע שלי בעולם היוגה התחלתי בשנת 2013, מתוך חיפוש אחר איזון והרמוניה בחיי. בשנת 2015 יצאתי להודו, שם השלמתי את קורס המורים הראשון שלי בסטודיו Universal Yoga של ויגיי האמר. לאחר מכן, המשכתי את החקירה בדרום הודו, במייסור – בירת האשטנגה העולמית, שם העמקתי את הידע שלי עם מורים ותיקים ומעוררי השראה.
       /  עם חזרתי לארץ בשנת 2016, המשכתי את דרכי עם המורה שלי, יניב עוקשי, במרכז "קארמה" בראשון לציון. בנוסף, בחרתי להעמיק את ההכשרה שלי בארץ והשלמתי קורס מורים נוסף של 500 שעות אשטנגה, שהתמקד בתרגול קלאסי ובשיטות הוראה מעמיקות. 
        / במקביל ללימודיי ביוגה, פניתי גם לעולם האיורוודה, מדע הרפואה ההודית. השלמתי מסלול לימודים תלת-שנתי אצל עמי ריין בפרדס חנה, כולל סטאז' מעשי בדרום הודו, שהעשיר את הכלים שאני מביא איתי לשיעורים ולמפגשים פרטניים. 
        / בסטודיו תוכלו ללמוד ולתרגל כמה סגנונות – אשטנגה קלאסית (סדרה ראשונה ושנייה), האטה יוגה ותרגולי מייסור. עבורי, היוגה היא מקור של חיים: היא מעוררת, מחייה, מחברת אותי לגוף ולנשימה ומעניקה שקט ורוגע בתוך הקצב המהיר של היומיום.  
        / **מזמין אתכם להצטרף אליי**  
         בין אם אתם בתחילת דרככם ובין אם אתם מחפשים להעמיק את התרגול שלכם, אני כאן כדי ללוות אתכם. המרחב שאני יוצר בשיעורים הוא מקום בטוח, מכיל ותומך – שבו תוכלו להקשיב לגוף, לנשום ולהרגיש.  
   
 `
export default function AboutMeIndex({ }: AboutMeIndexProps) {
  return (
    <section className="about-me-container ">
     <section className="teachers-container">
                <h3 className="meet-the-yogis-title">באו לפגוש את היוגים</h3>
                  <p className='txt'>אנחנו מקבלים תלמידים  בכל הרמות . השיעורים בסטודיו משלבים את מסגננות ההאטה יוגה, אשטנגה, וינאסה. שיעורים ממוקדים רעננים ומאתגרים. </p>
              </section>
      <h3 className='title tac'>נעים להכיר </h3>
    <section className='my-image-and-desc flex-col'>

        <DynamicImage imgClassName='me-image' url={'/2.jpg'} alt='image of myself'/>
      <section className='content'>
      <ParagraphsIndex desc={desc} />

      </section>
    </section>
    </section>
  )
}