import { Tmembership } from '@/app/types/types'
import React from 'react'
import MyMembershipPreview from './MyMembershipPreview'

type MyMembershipListProps = {
memberships:Tmembership[]
}

export default function MyMembershipsList({memberships}: MyMembershipListProps) {
  return (
    memberships&&
    <ol className='my-membership-wrapper'>
        {memberships.map((membership,i) => 
        <MyMembershipPreview key={membership._id} membership={membership} i={i}/>)}
    </ol>
  )
}