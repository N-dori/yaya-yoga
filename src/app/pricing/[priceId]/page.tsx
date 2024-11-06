import { plans } from '@/app/assets/data/plans'
import PlanDetails from '@/app/cmps/booking/PlanDetails'
import { Tplan } from '@/app/types/types'
import React from 'react'
type Props = {}

export default function page({params}) {

    const getPlan = () => 
        {
            return plans.find(currPlan => currPlan._id === params.priceId)
        }

    const plan:Tplan = getPlan() 
    
  return (
    <PlanDetails plan={plan}/>
  )
}