import Link from 'next/link'
import React from 'react'

type MyUserQuestionaireCardProps = {
    userQuestionnaireId:string
    userId:string
}

export default function MyUserQuestionaireCard({userQuestionnaireId,userId}: MyUserQuestionaireCardProps) {
  
    return (
    <div>
           {userQuestionnaireId?
                        <Link href={`userQuestionnaire/${userId}`}>לעדכון השאלון אישי</Link>
                    :
                    <div>
                        <Link href={`userQuestionnaire/${userId}`}>למילוי השאלון האישי </Link>
                        <span> וגם המלצה שתועדוד למלא אותו </span>
                       
                    </div>

                    }
    </div>
  )
}