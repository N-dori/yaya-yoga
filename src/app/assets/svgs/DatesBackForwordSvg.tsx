import React from 'react'

type DaysBackForwordSvgProps = {
  PAGE: number
  startIndex: number | undefined
  endIndex: number | undefined
  setStartIndex: (num: number) => void
  setEndIndex: (num: number) => void
  isRotate: boolean
  totalLength:number|undefined
  setCurrDate:(d:Date)=>void
  currDate:Date
}

export default function DatesBackForwordSvg({ currDate,setCurrDate,PAGE ,totalLength,isRotate, startIndex, endIndex, setEndIndex, setStartIndex }: DaysBackForwordSvgProps) {
  const handelClick = () => {

    if (!isRotate) {
      //rigth arrow
      console.log('left start index is : ',startIndex);
      let newDate:Date =new Date( currDate )
      // if (startIndex === 0) return
      if(startIndex!== undefined && endIndex!==undefined && totalLength){
        if(startIndex+PAGE>=totalLength){
          if(newDate.getDay() <= 4){
            moveOneDay(newDate,1)
            return 
          }else{
            return
          }
        }
      moveOneDay(newDate,1)
        
      }
      
      
    }else{
      // left arrow
      let newDate:Date =new Date( currDate )
      if(startIndex!== undefined && endIndex!==undefined ){
    if(startIndex <= 0 ){
      if(newDate.getDay() >= 1 )
      {
        moveOneDay(newDate,-1) 
        return 
      }else
      {
        return 
      }
    }
    moveOneDay(newDate,-1) 
      } 
    }
  }
  const moveOneDay = (newDate:Date ,diff) => {
    if(diff<0){
      newDate.setDate(newDate.getDate() - 1); // Move to the prev day
      setCurrDate(new Date(newDate))
    }else{
      newDate.setDate(newDate.getDate() + 1); // Move to the next day
      setCurrDate(new Date(newDate))
    }
  }
  return (
    <svg onClick={handelClick} className='BackForwordSvg pointer' 
    style={isRotate ? { transform: 'rotate(-180deg)' } : {}} 
    xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" 
    fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>

  )
}


