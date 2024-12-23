import {  Tmembership } from '@/app/types/types'
import React from 'react'
import MyWorkShopPreview from './MyWorkshopPreview'


type MyWorkshopsProps = {
  myWorkshops:Tmembership[]

}

export default function MyWorkshopsList({myWorkshops,}: MyWorkshopsProps) {
  return (
     <ul className='my-activities-warpper clean'>
      {myWorkshops&&

      myWorkshops.map(myWorkshop=>

        <MyWorkShopPreview 
        key={myWorkshop._id} 
        myWorkshop={myWorkshop}/>
      )
}
    </ul>
  )
}