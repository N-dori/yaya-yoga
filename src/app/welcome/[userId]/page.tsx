import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/AuthOptions';
import { getServerSession } from 'next-auth';
import { getUrl, sendEmail } from '../../utils/util';
import Link from 'next/link';
import { Tuser } from '@/app/types/types';

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
                console.log('updated user', await res.json());
                return await res.json()
            } else {
                console.log('there was a problem trying to update new user status');

            }

        } catch (error) {
            console.log('error updating New user');

        }
    }
    const getUser = async () => {
        try {
            const url = getUrl('user/getUser')

            const res = await fetch(url, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id: params.userId })
            })
            if (res.ok) {
                return await res.json()

            }
        } catch (error) {
            console.log('error getting user ');
        }
    }

    const user: Tuser = await getUser()
    console.log('user :', user)
    if (session) {
        if (user) {
            if (user.isNewUser) {
                await sendEmail(session?.user?.email, session?.user?.name, 'welcome', user._id)

            }
        }
    }
    return (
        <main className='welcome-container gc2 flex-col '>
            <p className='hey-title'> היי {session?.user?.name} </p>
            <p className='bold'>ברוך/ה הבא/ה למשפחת היוגה של יאיא יוגה! 🌿</p>`

            <p>
                אני כל כך שמח שבחרת להצטרף אלינו למסע המדהים הזה בעולם היוגה, ובמיוחד במסורת האשטנגה, שמתמקדת בנשימה, יציבות, והקשבה פנימית.
                כאן, תוכל/י למצוא את השקט והאיזון בחיי היומיום, ולהתחבר אל עצמך דרך התרגול.            </p>
            <p>

                במסגרת האתר שלנו, תוכל/י:

            </p>
            <ul>
               <li>   להירשם לשיעורי הסטודיו במהלך השבוע</li> 
                <li>   לקבל מידע על סדנאות ואירועים</li> 
               <li>ללמוד תוכן מעשיר - גישה למאמרים, סרטונים והדרכות שיחזקו את התרגול שלך וירחיבו את הידע.</li> 
            </ul>
            <p>
            כמובן - אני כאן לכל שאלה ואת/ה מוזמן/ת לפנות אלי בכל שלב. ✨

            </p>
            <p>
            נתראה על המזרן! 🙏 שלכם ובשבילכם יאיר שורץ
            </p>
            <p>לנוחיותכם ברגעים אלה נשלח לחשבון המייל שלך שאלון רפואי אותו אפשר למלא בזמן שנח לך </p>
            <Link className='transition-btn' href={`/trnsitionToUserQuestionnaire/${params.userId}`}>הבנתי תודה</Link>
        </main>
    )
}