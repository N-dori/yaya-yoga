
'use client'
import { Tplan } from '@/app/types/types'
import React from 'react'
import PlanPreview from './PlanPreview'

type PlanDetailsProps = {
  plan: Tplan
}

export default function PlanDetails({ plan }: PlanDetailsProps) {

  return (
    <section className='plan-details gc2'>
      <h1 className='tac p-1'>פרטי המנוי </h1>
      <PlanPreview
        planId={plan._id}
        planType={plan.type}
        planDesc={plan.desc}
        planPrice={plan.price}
        planConstraints={plan.constraints}
        mode={"booking"} />
    </section>
  )
}