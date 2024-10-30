import React from 'react'

type PlanPreviewProps = {
    planType:string,
    planDesc:string,
    planPrice:number,
    planConstraints:string[]
}

export default function PlanPreview(props: PlanPreviewProps) {
  return (
    <section className='plan-card-container flex-col gap1'>
        <h2 className='plan-type'>{props.planType}</h2>
        <h2 className='plan-price'>{props.planPrice} ש"ח</h2>
        <p className='book-plan-btn'>רישום</p>
        <p className='plan-desc'>{props.planDesc}</p>
        <ul className='plan-constriants flex-col' >
            {props.planConstraints.map(constraint=>
                <li className='plan-constriant'>{constraint}</li>
            )}
        </ul>
    </section>
  )
}