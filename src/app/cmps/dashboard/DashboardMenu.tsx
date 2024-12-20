'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function DashboardMenu({ }: Props) {

    const router = useRouter()
    const handelRoute = (route:string) => {
        router.replace('/')

            router.push(route)
            

    }
    return (
        <section className='dashboard-menu-container flex-col flex-jc-ac'>
            <p onClick={()=>handelRoute('/dashboard/presence')}>דף נוכחות</p>
            <p  onClick={()=>{handelRoute('/dashboard/create_periodic_agenda')}}>יצירת/עריכת לוז תקופתי</p>
            <p  onClick={()=>{handelRoute('/dashboard/practitioners_list')}}>רשימת תלמידים</p>
             <p onClick={()=>{handelRoute('/dashboard/create_announcement')}}> לוח מודעות</p>
            {/* <p>סיכום רכישות </p>
            <p>הזנת תקבולים</p> */}
        </section>
    )
}