import React from 'react'

type DaysBackForwordSvgProps = {
  PAGE: number
  startIndex: number | undefined
  endIndex: number | undefined
  setStartIndex: (num: number) => void
  setEndIndex: (num: number) => void
  isRotate: boolean
  totalLength:number|undefined

}

export default function DaysBackForwordSvg({PAGE ,totalLength,isRotate, startIndex, endIndex, setEndIndex, setStartIndex }: DaysBackForwordSvgProps) {
  const handelClick = () => {
    if (isRotate) {
      //rigth arrow
      if (startIndex === 0) return
      if(startIndex!== undefined && endIndex!==undefined){
        setStartIndex(+startIndex-PAGE)
        setEndIndex(endIndex-PAGE)

      }
      
      
    }else{
      // left arrow
  if(startIndex!== undefined && endIndex!==undefined && totalLength)
    if(+startIndex+PAGE>=totalLength){
      return 
    }else{
      setStartIndex(+startIndex+PAGE)
      setEndIndex(endIndex+PAGE)
    }
    
    }
    // in this case clicked on rigth arrow 
    // setStartIndex(startIndex+)
  }
  return (
    <svg onClick={handelClick} className='BackForwordSvg pointer' style={isRotate ? { transform: 'rotate(-180deg)' } : {}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>

  )
}


