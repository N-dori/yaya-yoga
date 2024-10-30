import React from 'react'

type DaysBackForwordSvgProps = {
  PAGE: number
  startIndex: number | undefined
  endIndex: number | undefined
  setStartIndex: (num: number) => void
  setEndIndex: (num: number) => void
  isRotate: boolean
  totalLength:number|undefined
  setIsOnCancelMode:(b:boolean)=> void

}

export default function DaysBackForwordSvg({setIsOnCancelMode,PAGE ,totalLength,isRotate, startIndex, endIndex, setEndIndex, setStartIndex }: DaysBackForwordSvgProps) {
  const handelClick = () => {
    //if we on cancelation mode we want to reverse that so 
    //re-render on get page func will get the rigth slice page  
    setIsOnCancelMode&& setIsOnCancelMode(false)
    if (!isRotate) {
      //rigth arrow
      console.log('left start index is : ',startIndex);
      // if (startIndex === 0) return
      if(startIndex!== undefined && endIndex!==undefined && totalLength){
        if(startIndex+PAGE>=totalLength){
          console.log('return ');
          return 
        }
        setStartIndex(+startIndex+PAGE)
        setEndIndex(endIndex+PAGE)
        
      }
      
      
    }else{
      // left arrow
      console.log('rigth start index is : ',startIndex);
      if(startIndex!== undefined && endIndex!==undefined ){
    if(startIndex <= 0 ){
      return 
    }
      setStartIndex(+startIndex-PAGE)
      setEndIndex(endIndex-PAGE)
      } 
    }
  }
  return (
    <svg onClick={handelClick} className='BackForwordSvg pointer' 
    style={isRotate ? { transform: 'rotate(-180deg)' } : {}} 
    xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" 
    fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>

  )
}


