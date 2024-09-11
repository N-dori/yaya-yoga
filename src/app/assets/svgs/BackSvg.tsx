import React from 'react'

type Props = {
  setIsPreviewDisplayShown?: (b: boolean) => void
  returnToDashboard?: () => void
}
export default function BackSvg({ setIsPreviewDisplayShown, returnToDashboard }: Props) {
  const handelClickBack =(ev : any, setIsPreviewDisplayShown:(b:boolean)=> void ,returnToDashboard:()=>void)=>{
   //when existing the preview display in:- creaction periodic agenda
    if(setIsPreviewDisplayShown) setIsPreviewDisplayShown(false)
         //when existing the preview display in: - edite periodic agenda
    if(returnToDashboard) returnToDashboard()
  }
  return (
    <div onClick={(ev)=>handelClickBack(ev, setIsPreviewDisplayShown, returnToDashboard) } className='back-svg-wrapper circle flex-jc-ac'>
      <svg onClick={returnToDashboard} className='back-svg' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
    </div>
  )


}