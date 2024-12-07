'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

export default function DashboardMenu({ }: Props) {

    const router = useRouter()
    const handelRoute = (route:string) => {
        router.replace('/')

            router.replace(route)
            

    }
    return (
        <section className='dashboard-menu-container flex-col flex-jc-ac'>
            <p onClick={()=>handelRoute('/dashboard/presence')}>דף נוכחות</p>
            <p  onClick={()=>{handelRoute('/dashboard/create_periodic_agenda')}}>יצירת לוז תקופתי</p>
            <p  onClick={()=>{handelRoute('/dashboard/edit_periodic_agenda')}}>עריכת לוז נוכחי</p>
            <p  onClick={()=>{handelRoute('/dashboard/practitioners_list')}}>רשימת תלמידים</p>
             <p onClick={()=>{handelRoute('/dashboard/create_announcement')}}>פרסום של ארוע/סדנא חדשה</p>
            {/* <p>סיכום רכישות </p>
            <p>הזנת תקבולים</p> */}
        </section>
    )
}