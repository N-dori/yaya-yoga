'use client'
import BackSvg from '@/app/assets/svgs/BackSvg'
import { TperiodicAgenda } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivities from './DaysOfActivities'
import { LesssonsInfoList } from './LesssonsInfoList'


type PreviewDisplayProps = {
  setIsPreviewDisplayShown?: (b: boolean) => void
  periodicAgenda: TperiodicAgenda | undefined
  isPreview: boolean
}

export default function PeriodicAgendaPreviewDisplay({ setIsPreviewDisplayShown, periodicAgenda, isPreview }: PreviewDisplayProps) {
  
  const [currDate, setCurrDate] = useState<Date>(new Date())
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      console.log('Periodic Agenda Preview Display props:',periodicAgenda);
      
    }
  }, []); 



  const DaysOfActivitiesProps = {
    periodicAgenda,
    setCurrDate,
    currDate
  }

  const LesssonsListProps = {
    periodicAgenda,
    currDate
  }

  return (
    <main className='preview-display-container '>
  {setIsPreviewDisplayShown&& <BackSvg setIsPreviewDisplayShown={() => setIsPreviewDisplayShown(false)} />}  
      { <h1 className='schedule-headline tac'>לוח זמנים</h1>}
      <h4 className='studio-name mb-05'>בית פעם- סטודיו קדם</h4>
      <h6 className='studio-address mb-05'>רחוב הדקלים 92, פרדס חנה-כרכור</h6>
      <h6 className='studio-phone mb-1'>052-437-7820</h6>
      <DaysOfActivities {...DaysOfActivitiesProps} />
      <LesssonsInfoList {...LesssonsListProps} />
    </main>
  )
}