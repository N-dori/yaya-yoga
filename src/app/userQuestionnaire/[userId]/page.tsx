import UserQuestionnaire from '@/app/cmps/user/UserQuestionnaire';
import React from 'react'

type Props = {}

export default function userQuestionnaire({ params }) {
    console.log('userQuestionnaire', params.userId);

 
    return (
        <main className='personal-questionnaire-container  gc2'>
            <h1 className='title tac'>YAYA YOGA<br></br>שאלון אישי</h1>
            <UserQuestionnaire _id={params.userId}/>
            </main>
    )
}