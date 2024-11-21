"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type MyUserHealthDecelrationCardProps = {
    userHealthDeclarationLink:string
    userId:string
}
export default function MyUserHealthDecelrationCard({userHealthDeclarationLink,userId}: MyUserHealthDecelrationCardProps) {
    const router= useRouter()

    const navigateTo = (route:string) => {
        router.replace(`/${route}`)
    }
  return (
 <div>
           {userHealthDeclarationLink?
              <div className='my-health-decleration-container flex-col flex-ac'>
                      <p className='mb-05'> הצהרת בריאות שלך מלאה וחתומה </p>
                        <p className='tac pointer underline'  onClick={()=>navigateTo(`healthDecleration/${userId}`)}>לעדכון הצהרת בריאות</p>
                </div>
                    :
                    <div className='my-health-decleration-container flex-col flex-ac'>
                        <p className='mb-05'> הבריאות הפיזית שלך במקום הראשון!</p>
                       בכדי לוודא שתרגול היוגה שלך בטוח ואפקטיבי, הנך מתבקש למלא הצהרת בריאות קצרה.  
                        מילוי הטופס לוקח כמה רגעים ועוזר למורה במתן המלצות לתרגול נכון ובטוח. 
                        <p className='underline mb-05'>**התרגול בסטודיו מותנה במילוי הצהרת בריאות </p>
                        <p className='underline pointer' onClick={()=>{navigateTo(`healthDecleration/${userId}`)}}>למילוי הצהרת בריאות  </p>
                       
                    </div>

                    }
    </div>  )
}