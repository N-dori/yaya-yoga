import { Tactivity } from '@/app/types/types'
import { stripTime } from '@/app/utils/util'
import React, { useEffect, useState } from 'react'
import { newDate } from 'react-datepicker/dist/date_utils'

type DaysOfActivitiesPreviewProps = {
  activityDay: Tactivity | undefined
  setCurrDate: (date: Date) => void
  currDate: Date
}

export default function DaysOfActivitiesPreview({ setCurrDate, activityDay, currDate }: DaysOfActivitiesPreviewProps) {
  const [hbDay, setHbDay] = useState<string>()
  const [dayNum, setDayNum] = useState<number>()
  const [hbMonth, setHbMonth] = useState<string>()
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const [isDateHasPassed, setIsDateHasPassed] = useState<boolean>(false)

  const hebrewMonths = [
    "ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני",
    "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
  ]

  const hebrewDays = [
    "ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת",
  ]

  useEffect(() => {
    if (activityDay) {
      if(activityDay.date){
      const activityDate = new Date(activityDay.date)

      setDayNum(activityDate.getDate())
      const monthIndex = activityDate.getMonth()
      setHbMonth(hebrewMonths[monthIndex])
      const today = new Date()
    isDatePassed(today)
      if (isBothTheSameDate(activityDate,today)) {
        console.log('both days are the same')
        setHbDay('היום')
      } else {
        const dayIndex = activityDate.getDay()
        setHbDay(hebrewDays[dayIndex])
      }
    }}
  }, [activityDay?.date])

  useEffect(() => {
    if(activityDay){
      if(activityDay.date&& currDate){
        if (!isNaN(new Date(activityDay.date).getTime())) {// Check if the date is valid
          if (stripTime(activityDay.date).getTime() === stripTime(currDate).getTime()) {
            setIsClicked(true)
          } else {
            setIsClicked(false)
          }

        } 

      }
    }
  
    
  }, [activityDay, currDate])
  
  const isBothTheSameDate = (date1:Date,date2:Date)=> {
    return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  }

  const handelDayClicked = () => {
    if (activityDay?.date) {
      setCurrDate(new Date(activityDay.date))
    }
  }

   const isDatePassed = (today:Date) => {
    if(today.getDay()!==6){
      
      setIsDateHasPassed( new Date (activityDay.date).getDay()<today.getDay())

    }else{
      today.setDate(today.getDate() + 1)
      setIsDateHasPassed( new Date (activityDay.date).getDay()<today.getDay())

    }
   }

  const isClickedStylesProps = {
    border: `1px solid #9a9796`,
    background: `#ffffff`
  }

  return (
    <section className={`${isDateHasPassed?'date-passed ':' '}date-info flex-jc-ac flex-col`}
      style={isClicked ? { ...isClickedStylesProps } : {}}
      onClick={handelDayClicked}>
      <li className='day clean'>{hbDay}</li>
      <li className='number clean'>{dayNum}</li>
      <li className='month clean'>{hbMonth}</li>
    </section>
  )
}