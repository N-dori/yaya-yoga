import React, { useState } from 'react'
import { Tmembership } from '@/app/types/types'
import MyWorkshopsList from './MyWorkshopsList'

type MyWorkshopsIndexProps = {
  myWorkshopsTickets:Tmembership[]

}
export default function MyWorkshopsIndex({myWorkshopsTickets}: MyWorkshopsIndexProps) {
    let MyWorkshopsListProps = {
        myWorkshops:myWorkshopsTickets,
      
    }


  return (
    <section className='my-workshops-container '>

       
        <MyWorkshopsList {...MyWorkshopsListProps}  />
  
</section>
  )
}