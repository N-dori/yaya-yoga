import React from 'react'
import WorkshopsIndex from '../cmps/workshops/WorkshopsIndex'
import { getWorkshops } from '../utils/util'
import { Tworkshop } from '../types/types'

type Props = {}

export default async function page({}: Props) {

  const workshops:Tworkshop[] = await getWorkshops()
  // console.log('w***',workshops);
  
  let workshopsGruopedByTitle : Tworkshop[][] =[]
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
      workshopsGruopedByTitle.push( workshopsByTitle[key])
      //[ [{workshop},{workshop}] , [{workshop}]]----workshops of the same title! the length of each tells the number of meetings
    }
    workshopsGruopedByTitle.reverse()
  }
    // console.log('workshopsGruopedByTitle',workshopsGruopedByTitle);
  

  return (
    <main className='workshops-page-container gc2'>
   <h1 className='title tac mt-1'>YAYA YOGA</h1>
   <h2 className='mb-1 tac'>סדנאות</h2>
     {workshopsGruopedByTitle&&
        workshopsGruopedByTitle.map((groupOfWorkshopsOfTheSameTitle,i)=>
      <WorkshopsIndex key={i} workshops={groupOfWorkshopsOfTheSameTitle}/>
     )} 
    </main>
  )
}