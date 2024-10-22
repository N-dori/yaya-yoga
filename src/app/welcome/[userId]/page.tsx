import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/AuthOptions';
import { getServerSession } from 'next-auth';
import { getUrl } from '../../utils/util';
import Link from 'next/link';

type Props = {}

export default async function page({ params }) {
    console.log('params.welcomeUserId', params.userId);
    // 
    const session = await getServerSession(authOptions)

    const updateNewUser = async (_id: string) => {

        try {
            const url = getUrl('user/handelNewUser/')
            const res = await fetch(url, {

                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id })

            })
            if (res.ok) {
                console.log('updated user',await res.json() );
                return await res.json()
            }else{
                console.log('there was a problem trying to update new user status');

            }

        } catch (error) {
            console.log('error updating New user');

        }
    }
    const sendWelcomeEmail = async () => {
        try {
            await updateNewUser(params.userId);
            const url = getUrl('sendEmail')
            const name = session?.user?.name
            const email = session?.user?.email
            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to: email, name , _id:params.userId })
            })
            if (res.ok) {
                console.log('email sent happyly!!!');

            }


        } catch (error) {
            console.log('error sending Welcome Email');
        }
    }
    const getUser = async () => {
        try {
            const url = getUrl('user/getUser')
    
            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({_id:params.userId })
            })
            if (res.ok) {
                return await res.json()

            }
        } catch (error) {
            console.log('error getting user ');
        }
    }
    
    const user = await getUser() 
    console.log('user :', user)
    if (session) {
      if(user){
        if(user.isNewUser){
            await sendWelcomeEmail()

        }
      }
    }
    return (
        <main className='welcome-container gc2 flex-col '>
            <p className='hey-title'> היי {session?.user?.name} </p>
            <p> ברוך הבא לסטודיו קדם</p>
            <p>שמחים שאתה איתנו</p>
            <p>ברוך/ה הבא/ה למשפחת היוגה של סטודיו קדם! 🌿</p>`

            <p>
                אנחנו כל כך שמחים שהצטרפת אלינו למסע המדהים הזה בעולם היוגה, במיוחד במסורת האשטנגה, שמתמקדת בנשימה, יציבות, והקשבה פנימית. כאן, תוכל/י למצוא את השקט והאיזון בחיי היומיום, ולהתחבר אל עצמך דרך התרגול.
            </p>
            <p>

                במסגרת האתר שלנו, תוכל/י:

            </p>
            <p>

                להירשם לשיעורים: .
                ללמוד תוכן מעשיר: גישה למאמרים, סרטונים והדרכות שיחזקו את התרגול שלך וירחיבו את הידע.
            </p>
            <p>
                אם יש לך שאלות, את/ה תמיד מוזמן/ת לפנות אלינו בכל שלב.
                אנחנו כאן כדי לתמוך בך ולעזור לך להפיק את המיטב מהחוויה שלך איתנו.
                ✨
            </p>
            <p>
                מתנה קטנה עבורך: לכבוד הצטרפותך, אנחנו מציעים לך שיעור ראשון במתנה! פשוט השתמש/י בקוד WELCOME
                כשתרשום/י לשיעור הקרוב שלך

            </p>





            נתראה על המזרן! 🙏
            שלכם ובשבילכם יאיר שוורץ
            <p>לנוחיותכם ברגעים אלה נשלח לחשבון המייל שלך שאלון רפואי אותו אפשר למלא בזמן שנח לך </p>
            <Link className='transition-btn' href={`/trnsitionToUserQuestionnaire/${params.userId}`}>הבנתי תודה</Link>
        </main>
    )
}