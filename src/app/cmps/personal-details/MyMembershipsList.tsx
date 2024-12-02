import { Tmembership } from '@/app/types/types'
import React from 'react'
import MyMembershipPreview from './MyMembershipPreview'
import Link from 'next/link'

type MyMembershipListProps = {
memberships:Tmembership[]
}

export default function MyMembershipsList({memberships}: MyMembershipListProps) {
  return (
    memberships?
    <ul className='my-membership-wrapper flex-col gap05'>
        {memberships.map((membership,i) => 
        <MyMembershipPreview key={membership._id} membership={membership} i={i}/>)}
    </ul>
    :
    <section className='flex-col flex-ac'>
    <p>אין ברשותך מנוי פעיל עדיין...  </p>
    <Link href={'/pricing'}>לרכישה</Link>
    </section>
  )
}