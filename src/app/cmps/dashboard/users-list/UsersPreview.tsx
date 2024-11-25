import { Tmembership, Tuser } from '@/app/types/types'
import React from 'react'

type UsersPreviewProps = {
    user:Tuser
}

export default function UsersPreview({user}: UsersPreviewProps) {
const membershipLength = user?.memberships?.length  
  return (
    <tr>
      <td>{user.name}</td>

      <td>{membershipLength?
      membershipLength > 1 ?
      `ישנם ${membershipLength} מנויים ` 
      :`ישנו מנוי 1`
      :'אין מנוי'}</td>

      <td>{user.healthDeclaration?<span>קישור להורדה</span>:<span>חסר</span>}</td>
      <td>{user.userQuestionnaireId?<span>לצפייה בשאלון</span>:<span>לעדכון פרטים</span>}</td>

    </tr>  )
}