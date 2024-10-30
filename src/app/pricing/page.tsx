import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import PlansList from '../cmps/booking/PlansList';

type Props = {}

export default async function Pricing({}: Props) {

      return (
        <main className='pricing-page-container gc2'>
<h1 className='tac'>מחירים</h1>
<h2 className='tac title'>תוכניות ומנויים</h2>
<PlansList></PlansList>
        </main>
    )
}