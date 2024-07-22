import React from 'react'

type Props = {
    setIsPreviewDisplayShown:(b:boolean)=> void
}

export default function BackSvg({setIsPreviewDisplayShown}: Props) {
  return (
    <div onClick={()=>setIsPreviewDisplayShown(false)} className='back-svg-wrapper circle flex-jc-ac'>
<svg className='back-svg'  xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg> 
</div>
)


}