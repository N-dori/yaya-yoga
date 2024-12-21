import { Tactivity } from '@/app/types/types'
import { getDateType, stripTime } from '@/app/utils/util'
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
    console.log('cuurDate #$%#', currDate);
    
    if (activityDay) {
      if(activityDay.date){
      const activityDate = new Date(activityDay.date)

      setDayNum(activityDate.getDate())
      const monthIndex = activityDate.getMonth()
      setHbMonth(hebrewMonths[monthIndex])
      const today = new Date()
      console.log('both days are the same', today.getDay())
      console.log('both days are the same', today.toDateString())
      console.log('both days are the same', today.toLocaleDateString('he-IL'))
      
      if(isBothTheSameDate(activityDate,today)) {
        today.getDay() === 6? setHbDay('ראשון') : setHbDay('היום')
        return
      } else {
        const dayIndex = activityDate.getDay()
        setHbDay(hebrewDays[dayIndex])
      }
      isDayPassed(today)
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

   const isDayPassed = (today:Date) => {
    if(today.getDay()!==6){
      console.log('in if');
      
      setIsDateHasPassed( getDateType(activityDay.date).getDay()<today.getDay())
      
    }else{
      console.log('in ekse');
      today.setDate(today.getDate() + 1)
      setIsDateHasPassed(  getDateType (activityDay.date).getDay()<today.getDay())

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