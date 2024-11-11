
import { plans } from '@/app/assets/data/plans'
import React from 'react'
import PlanPreview from './PlanPreview'
import { Tplan } from "@/app/types/types";

type Props = {}

export default function PlansList({ }: Props) {


    return (
        <section
            className='plans-list-container flex-col gap1'>
            {
                plans.map((plan: Tplan) => <PlanPreview
                    key={plan._id}
                    planId={plan._id}
                    planType={plan.type}
                    planDesc={plan.desc}
                    planPrice={plan.price}
                    planConstraints={plan.constraints}
                    mode={"details"} />)
            }
        </section>
    )
}