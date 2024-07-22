import { Tactivity } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import { newDate } from 'react-datepicker/dist/date_utils'

type DaysOfActivitiesPreviewProps = {
  activityDay:Tactivity|undefined
}

export default function DaysOfActivitiesPreview({activityDay}: DaysOfActivitiesPreviewProps) {
  const [hbDay, setHbDay] = useState<string>()
  const [dayNum, setDayNum] = useState<number>()
  const [hbMonth, setHbMonth] = useState<string>()
  const hebrewMonths = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
]

const hebrewDays = [
   "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", 
]

useEffect(() => {
  if (activityDay?.date) {
    const activityDate = new Date(activityDay.date)
    
    setDayNum(activityDate.getDate())
    const monthIndex =activityDate.getMonth()
    setHbMonth(hebrewMonths[monthIndex])
    const today = new Date()
    if (activityDate.getDate() === today.getDate() &&
        activityDate.getMonth() === today.getMonth() &&
        activityDate.getFullYear() === today.getFullYear()) {
      console.log('both days are the same')
      setHbDay('היום') 
    } else {
      const dayIndex = activityDate.getDay()
      setHbDay(hebrewDays[dayIndex])
    }
  }
}, [activityDay?.date])

  return (
<section className='date-info flex-jc-ac flex-col'>
<li className='day clean'>{hbDay}</li>
<li className='number clean'>{dayNum}</li>
<li className='month clean'>{hbMonth}</li>

</section>
  )
}