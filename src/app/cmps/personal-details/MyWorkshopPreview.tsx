'use client'
import { Tmembership } from '@/app/types/types'
import {  getFormattedDate } from '@/app/utils/util'
import React from 'react'

type MyActivitiesPreviewProps = {
    myWorkshop:Tmembership

}

export default function MyWorkShopPreview({ myWorkshop}: MyActivitiesPreviewProps) {
    
const getExpiryDate =() => {
    return getFormattedDate(myWorkshop.end)
}
    return (
        <li className='my-membership-card flex-col gap05'>

      <p className=''>סוג המנוי : {myWorkshop?.subscription?.type}</p>
      <p className=''>שם הסדנא  : {myWorkshop?.subscription?.workshopTitle}</p>

      {myWorkshop?.subscription?.type !== 'חופשי חודשי' && <p className=''>
        מספר כניסות שנותרו : {myWorkshop?.subscription?.entries + ''}</p>}

      <p className=''>  מנוי נרכש בתאריך  : {new Date(myWorkshop?.dateOfPurchase).toLocaleDateString('he-IL')}</p>

      <p className=''>   המנוי <span className='bold'>בתוקף עד</span>  : {getExpiryDate()}</p>
    </li>
    )
}