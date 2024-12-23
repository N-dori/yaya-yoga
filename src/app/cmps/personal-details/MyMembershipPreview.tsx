import { Tmembership } from '@/app/types/types'
import React from 'react'

type MyMembershipPreviewProps = {
  membership: Tmembership
  i: number
}

export default function MyMembershipPreview({ membership, i }: MyMembershipPreviewProps) {
  const expiryDate = new Date(membership?.end).toLocaleDateString('he-IL')

  const getFormatedExpiryDate = () => {
    return expiryDate === "Invalid Date" ?
      membership?.subscription?.type !== 'חופשי חודשי' ?
        'חצי שנה מרגע ההרשמה לשיעור הראשון'
        : 'חודש מרגע ההרשמה לשיעור הראשון'
      : expiryDate
  }
  
  const formatedExpiryDate = getFormatedExpiryDate()

  return (
    <li className='my-membership-card flex-col gap05'>

      <p className=''>סוג המנוי : {membership?.subscription?.type}</p>

      {membership?.subscription?.type !== 'חופשי חודשי' && <p className=''>
        מספר כניסות שנותרו : {membership?.subscription?.entries + ''}</p>}

      <p className=''>  מנוי נרכש בתאריך  : {new Date(membership?.dateOfPurchase).toLocaleDateString('he-IL')}</p>

      <p className=''>   המנוי <span className='bold'>בתוקף עד</span>  : {formatedExpiryDate}</p>
    </li>
  )
}