import MenuSvg from '@/app/assets/svgs/MenuSvg'
import React, { useEffect, useState } from 'react'
import MainMenuList from './MainMenuList'
import CloseSvg from '@/app/assets/svgs/CloseSvg'
import Link from 'next/link'

type Props = {}

export default function MainMenu({ }: Props) {
  const [isShown, setIsShown] = useState(false)
  useEffect(() => {
    console.log('isShown', isShown);

  }, [])
  const mainMenuListProps = {
    isShown,
    setIsShown
  }
  const menuSvgProps = {
    isShown,
    setIsShown
  }
  return (
    <section className='menu-container flex-jc-ac'>
      {isShown ?
          <div className='flex-jc-ac gap05'>
            <CloseSvg />
            <Link href={'/'}> לוגו</Link>
          </div>
        :
        <div className='flex-jc-ac gap05'>
          <MenuSvg {...menuSvgProps} />
          <Link href={'/'}> לוגו</Link>
        </div>}
      <MainMenuList {...mainMenuListProps} />
      {isShown ?
        <div onClick={() => setIsShown(!isShown)} className='backdrop'></div>
        :
        <></>}
    </section>
  )
}