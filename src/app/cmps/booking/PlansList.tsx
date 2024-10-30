
import { plans } from '@/app/assets/data/plans'
import React from 'react'
import PlanPreview from './PlanPreview'

type Props = {}

export default function PlansList({}: Props) {

    return (
    <section 
    className='plans-list-container flex-col gap1'>
        {
            plans.map(plan => <PlanPreview 
                planType={plan.type} 
                planDesc={plan.desc} 
                planPrice={plan.price} 
                planConstraints={plan.constraints}/>)
        }   
    </section>
  )
}