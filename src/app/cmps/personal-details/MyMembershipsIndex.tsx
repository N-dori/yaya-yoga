import { Tmembership } from '@/app/types/types'
import React from 'react'
import MyMembershipsList from './MyMembershipsList'
import Link from 'next/link'

type MyMembershipsIndexProps = {
    memberships:Tmembership[]

}

export default function MyMembershipsIndex({memberships}: MyMembershipsIndexProps) {
  return (
  <>
  <div className='is-membership-excist-txt'>
      {memberships?.length === 0 && <div className='tac mb-05 flex-col gap05'><p> לא קיים מנוי פעיל</p><Link href={'/pricing'}>לרכישת מנוי חדש</Link></div>}
      {memberships?.length === 1 && <p className='tac mb-05'> קיים מנוי פעיל 1</p>}
      {memberships?.length > 1 && <p className='tac mb-05'>קיימים {memberships?.length} מנויים פעילים</p>}

  </div>
  <MyMembershipsList memberships={memberships} />
  
  </>


  )
}