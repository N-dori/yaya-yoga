import React from 'react'

type Props = {}

export default function DaysOWeek({}: Props) {
    const days= ["א","ב","ג","ד","ה","ו","ש"]
  return (
 

    <section className='weekly-schedule-warpper '>
      <ul className='days-container grid gap1'>
        {days.map((day,i)=>  <li key={day} style={{gridColumn:`${1+i}`}} className={`day`}>{day}</li>)}
      
      </ul>
    </section>


  )
}