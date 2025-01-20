import React from 'react'
import DateTime from '../cmps/dashboard/DateTime';
import DashboardMenu from '../cmps/dashboard/DashboardMenu';

type Props = {}

export default function Dashboard({}: Props) {

  
  const getGreeting = () => {
    const hours = new Date().getHours();
  
    if (hours >= 5 && hours < 12) return `בוקר טוב🔅`;
    if (hours >= 12 && hours < 16) return `צהריים טובים `;
    if (hours >= 16 && hours < 19) return `אחר צהריים טובים `;
    return `לילה טוב`;
  };
    
  return (
    <main className='dashboard-container gc2 '>
        <DateTime/>
        <h1 className='tac mt-1'>  היי יאיר {getGreeting()}</h1>
        <DashboardMenu/>

    </main>
  )
}