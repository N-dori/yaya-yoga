import React from 'react'

type Props = {
    setIsShown:(isShown:boolean) =>void
    isShown:boolean

}

export default function  MenuSvg({isShown,setIsShown}: Props) {
  const HandelOpenMenu = () => {
setIsShown(!isShown)
// disableScroll()
  }

  const disableScroll = () => {
    // Disable scrolling on touch devices
    document.body.style.overflow = "hidden"; // For most devices
    document.body.style.touchAction = "none"; // Specifically for touch gestures
  }

  return (
<svg onClick={HandelOpenMenu} 
xmlns="http://www.w3.org/2000/svg" 
height="30px" viewBox="0 -960 960 960" width="30px" 
fill="#FFF"
className='menu-svg pointer '><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>  )
}