import React from 'react'

type CloseMenuProps = {
  setIsShown:(isShown:boolean) =>void
  isShown:boolean
}

export default function CloseMenuSvg({setIsShown,isShown}: CloseMenuProps) {
  return (
    <div className='closeMenuSvg  gr7' onClick={()=>setIsShown(false)}><svg style={{transform:`rotate(90deg)`}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-280v-400L240-480l200 200Zm80 160h80v-720h-80v720Z"/></svg></div>
  )
}