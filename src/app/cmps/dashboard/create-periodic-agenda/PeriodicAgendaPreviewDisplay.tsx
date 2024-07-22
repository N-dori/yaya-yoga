import BackSvg from '@/app/assets/svgs/BackSvg'
import { TperiodicAgenda } from '@/app/types/types'
import React, { useEffect } from 'react'
import DaysOfActivities from './DaysOfActivities'
import { LesssonsInfoList } from './LesssonsInfoList'


    type PreviewDisplayProps = {
        setIsPreviewDisplayShown:(b:boolean) => void
        periodicAgenda:TperiodicAgenda| undefined
        isPreview:boolean
    }

    export default function PeriodicAgendaPreviewDisplay({setIsPreviewDisplayShown,periodicAgenda,isPreview}: PreviewDisplayProps) {

        window.scroll(0,0)

      
      const DaysOfActivitiesProps ={
        periodicAgenda
      }
  
      const LesssonsListProps ={
        periodicAgenda
      }
  
  return (
    <main className='preview-display-container '>
      <BackSvg setIsPreviewDisplayShown={()=>setIsPreviewDisplayShown(false)}/> 
{isPreview && <h1 className='headline tac mb-1'>לוח זמנים</h1>}
<h4 className='studio-name mb-05'>בית פעם- סטודיו קדם</h4>
<h6 className='studio-address mb-05'>רחוב הדקלים 92, פרדס חנה-כרכור</h6>
<h6 className='studio-phone mb-1'>052-437-7820</h6>
    <DaysOfActivities {...DaysOfActivitiesProps} />
    <LesssonsInfoList {...LesssonsListProps}/>
    </main>
  )
}