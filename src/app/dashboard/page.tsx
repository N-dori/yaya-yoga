import React from 'react'
import DateTime from '../cmps/dashboard/DateTime';
import DashboardMenu from '../cmps/dashboard/DashboardMenu';

type Props = {}

export default function Dashboard({}: Props) {

  
  const getGreeting = () => {
      const today = new Date();
      const hours = today.getHours();
      console.log('hours',hours)
      if(hours<12)return `בוקר טוב`
      if(hours>12&&hours<16)return `צהריים טובים `
      if(hours>16&&hours<20)return `אחר צהריים טובים `
      if(hours>20||hours===+'00')return `לילה טוב `
 
    
    }
    
  return (
    <main className='gc2'>
        <DateTime/>
        <h1 className='tac'>  היי יאיר {getGreeting()}</h1>
        <DashboardMenu/>

    </main>
  )
}