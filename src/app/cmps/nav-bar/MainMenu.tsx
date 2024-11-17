import MenuSvg from '@/app/assets/svgs/MenuSvg'
import React, { useEffect, useState } from 'react'
import MainMenuList from './MainMenuList'
import CloseSvg from '@/app/assets/svgs/CloseSvg'
import Link from 'next/link'

type MainMenuProps = {
  isShown: boolean
  setIsShown: (b: boolean) => void
}

export default function MainMenu({setIsShown, isShown }: MainMenuProps) {

  const mainMenuListProps = {
    isShown,
    setIsShown
  }

  return (
    <section style={isShown?{transform: `translateY(4em)`}:{}} className='menu-container '>

      <MainMenuList {...mainMenuListProps} />

    </section>
  )
}