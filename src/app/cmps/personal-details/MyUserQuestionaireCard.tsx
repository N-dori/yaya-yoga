
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type MyUserQuestionaireCardProps = {
    userQuestionnaireId:string|undefined
    userId:string
}

export default function MyUserQuestionaireCard({userQuestionnaireId,userId}: MyUserQuestionaireCardProps) {
  console.log('userQuestionnaireId',userQuestionnaireId);
  const router= useRouter()

  const navigateTo = (route:string) => {
      router.replace(`/${route}`)}
    return (
    <div className='my-user-questionnaire-conatiner flex-col gap05'>
      <span > מסע היוגה הינו יחודי לכל אדם, מילוי השאלון עוזר למורה להבין את הצרכים שלך, המטרות והעדפות שלך בצורה טובה יותר. ביחד אנחנו יכולים ליצור תרגול מותאם יותר ונכון יותר עבורך</span>
    
                        <p className='btn flex-jc-ac'   onClick={()=>navigateTo(`userQuestionnaire/${userQuestionnaireId}-${userId}`)} >
                          {userQuestionnaireId?' לעדכון השאלון אישי':'למילוי השאלון האישי '}
                         </p>
                    
                 
                       
             

                    
    </div>
  )
}