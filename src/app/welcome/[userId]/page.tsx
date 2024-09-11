import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/AuthOptions';
import { getServerSession } from 'next-auth';
import { getUrl } from '../../util';

type Props = {}

export default async function page({params}) {
    console.log('params.welcomeUserId',params.userId);

    const session = await getServerSession(authOptions)
    
    const updateNewUser = async (_id) => {
        const url = getUrl('auth/handelNewUser/')


        const res = await fetch(url, {
  
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id })
  
        })
    }

    if (session) {
        await updateNewUser(params.userId);
    }
    return (
        <main className='gc2 tac'>
            <p> היי {session?.user?.name} ברוך הבא לסטודיו קדם</p>
            <p>שמחים שאתה איתנו</p>
            <p>ברגעים אלה נשלח אליך שאלון רפואי </p>
        </main>
    )
}