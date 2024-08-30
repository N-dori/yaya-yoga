'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function DashboardMenu({ }: Props) {

    const router = useRouter()
    return (
        <section className='dashboard-menu-container flex-col flex-jc-ac'>
            <p>דף נוכחות</p>
            <p  onClick={()=>{router.replace('/dashboard/create_periodic_agenda')}}>יצירת לוז תקופתי</p>
            <p  onClick={()=>{router.replace('/dashboard/edit_periodic_agenda')}}>עריכת לוז נוכחי</p>
            <p>פרסום של ארוע/סדנא חדשה</p>
            <p>סיכום רכישות </p>
            <p>הזנת תקבולים</p>
        </section>
    )
}