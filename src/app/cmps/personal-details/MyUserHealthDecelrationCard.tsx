import Link from 'next/link'
import React from 'react'

type MyUserHealthDecelrationCardProps = {
    userHealthDeclarationLink:string
    userId:string
}

export default function MyUserHealthDecelrationCard({userHealthDeclarationLink,userId}: MyUserHealthDecelrationCardProps) {
  return (
 <div>
           {userHealthDeclarationLink?
                        <Link href={`healthDecleration/${userId}`}>לעדכון הצהרת בריאות</Link>
                    :
                    <div>
                        <Link href={`healthDecleration/${userId}`}>למילוי הצהרת בריאות  </Link>
                        <span> וגם המלצה שתועדוד למלא אותו </span>
                       
                    </div>

                    }
    </div>  )
}