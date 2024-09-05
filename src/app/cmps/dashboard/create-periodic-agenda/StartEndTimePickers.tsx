import React from 'react'
import { he } from 'date-fns/locale';
import { clockSvg } from '@/app/assets/svgs/ClockSvg'
import DatePicker from 'react-datepicker';

type StartEndTimePickersProps = {
    activityStartTime:Date | null | undefined
    activityEndTime:Date | null | undefined
    handelTimeChange:(currDate: Date | null | undefined, startEnd: string) => void
    error:string
}

export  function StartEndTimePickers({error,activityEndTime,handelTimeChange,activityStartTime}: StartEndTimePickersProps) {
  return (
    <>
    

    <DatePicker
    selected={activityStartTime}
    onChange={(curtime:Date|null) => handelTimeChange(curtime, 'start')}
    showTimeSelect
    showTimeSelectOnly
    placeholderText="בחר שעת התחלה"
    dateFormat="hh:mm aaaa"
    showIcon
    icon={clockSvg}                   
    timeCaption="זמן"
    timeFormat="HH:mm"
    locale={he}

    timeIntervals={30}
   />

<DatePicker
    selected={activityEndTime}
    onChange={(curtime:Date|null) => handelTimeChange(curtime, 'end')}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={30}
  timeCaption="זמן"
    dateFormat="h:mm aaaaa"
    placeholderText="בחר שעת סיום"
    showIcon
    icon={clockSvg}
    timeFormat="HH:mm"
    locale={he} />  
    <span style={{color:'red'}}className='error'>{error}</span>
      </>  )
}