export const dynamic = 'force-dynamic'
import React from 'react'
import WorkshopsIndex from '../cmps/workshops/WorkshopsIndex'
import { getWorkshops } from '../actions/workshopActions'
import { Tworkshop } from '../types/types'

type Props = {}

export default async function page({}: Props) {

  const workshops:Tworkshop[] = await getWorkshops()
  // console.log('w***',workshops);
  
  let workshopsGroupedByTitle : Tworkshop[][] =[]
  if(workshops){

    const workshopsByTitle = workshops.reduce((workshopMap,workshop)=>{
      if(workshopMap[`${workshop.title}`] === undefined){
        workshopMap[`${workshop.title}`] = [workshop]
      }else{
        workshopMap[`${workshop.title}`].push(workshop)
      }
      return workshopMap
    },{})
    
    for (const key in workshopsByTitle) {
      workshopsGroupedByTitle.push( workshopsByTitle[key])
      //[ [{workshop},{workshop}] , [{workshop}]]----workshops of the same title! the length of each tells the number of meetings
    }
    workshopsGroupedByTitle.reverse()
  }
    // console.log('workshopsGroupedByTitle',workshopsGroupedByTitle);
  

  return (
    <main className='workshops-page-container gc2'>
   <h1 className='title tac mt-1'>YAYA YOGA</h1>
   <h2 className='mb-1 tac'>סדנאות</h2>
     {workshopsGroupedByTitle&&
        workshopsGroupedByTitle.map((groupOfWorkshopsOfTheSameTitle,i)=>
      <WorkshopsIndex key={i} workshops={groupOfWorkshopsOfTheSameTitle}/>
     )} 
    </main>
  )
}