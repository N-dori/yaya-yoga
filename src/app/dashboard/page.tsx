import React from 'react'
import DateTime from '../cmps/dashboard/DateTime';
import DashboardMenu from '../cmps/dashboard/DashboardMenu';

type Props = {}

export default function Dashboard({}: Props) {

  
  const getGreeting = () => {
      const today = new Date();
      const hours = today.getHours();
      const fiveAm =today.setHours(5,0,0,0)
      const twelvePm =today.setHours(12,0,0,0)
      const fourPm = today.setHours(16,0,0,0)
      const sevenPm = today.setHours(19,0,0,0)
      if(fiveAm>=hours && hours<=twelvePm)return `בוקר טוב🔅`
      if(twelvePm>=hours && hours<=fourPm)return `צהריים טובים `
      if(fourPm>hours && hours <=sevenPm)return `אחר צהריים טובים `
      if(sevenPm>=hours )return `לילה טוב`
 
    
    }
    
  return (
    <main className='dashboard-container gc2 '>
        <DateTime/>
        <h1 className='tac mt-1'>  היי יאיר {getGreeting()}</h1>
        <DashboardMenu/>

    </main>
  )
}