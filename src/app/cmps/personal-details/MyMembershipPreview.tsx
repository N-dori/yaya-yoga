import { Tmembership } from '@/app/types/types'
import React from 'react'

type MyMembershipPreviewProps = {
    membership:Tmembership
    i:number
}

export default function MyMembershipPreview({membership ,i }: MyMembershipPreviewProps) {
  const expiryDate = new Date(membership.end).toLocaleDateString('he-IL')
  const formatedExpiryDate =expiryDate  === "Invalid Date"? 'חצי שנה מרגע ההרשמה לשיעור הראשון':expiryDate
  return (
    <li className='my-membership-card flex-col gap05'>
        <p className=''>סוג המנוי : {membership.subscription.type}</p>
        <p className=''>   מספר כניסות שנותרו : {membership.subscription.entries+''}</p>
        <p className=''>  מנוי נרכש בתאריך  : {new Date(membership.dateOfPurchase).toLocaleDateString('he-IL')}</p>
        <p className=''>  המנוי בתוקף עד  : {formatedExpiryDate}</p>
    </li>
  )
}