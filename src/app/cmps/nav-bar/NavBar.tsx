'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MainMenu from './MainMenu'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import CloseSvg from '@/app/assets/svgs/CloseSvg'
import MenuSvg from '@/app/assets/svgs/MenuSvg'
import { isEnglishCharacter } from '@/app/utils/util'

type Props = {}
export default function NavBar({ }: Props) {
  const [isShown, setIsShown] = useState(false)
  const [isHomePage, setIsHomePage] = useState(true)
  const [isDashboard, setIsDashboard] = useState(false)
  const [firstLetter, setfirstLetter] = useState("")
  const { data: session } = useSession()
  const router = useRouter();
  const path = usePathname()


  useEffect(() => {
    path === '/'
      ?
      setIsHomePage(true)
      :
      setIsHomePage(false)
  }, [path]);
  useEffect(() => {
    console.log('path',path);
    
    path === '/dashboard/create_periodic_agenda'
      ?
      setIsDashboard(true)
      :
      setIsDashboard(false)
  }, [path]);

  useEffect(() => {
    if(session?.user?.email){
      getUserFirstLetter()
    }else{
      setfirstLetter('')
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = "hidden"; // Prevent scroll
      document.body.style.touchAction = "none"; // Disable touch gestures
    } else {
      document.body.style.overflow = ""; // Re-enable scroll
      document.body.style.touchAction = ""; // Re-enable touch gestures
    }
  }, [isShown]);


  const handelLogoClicked = () => {
    setIsShown(false)
    router.replace('/')
  }

  const getUserFirstLetter = () => {
    const firstLetter = session?.user?.name[0]
    if (firstLetter) {
      if (isEnglishCharacter(firstLetter)) {
        setfirstLetter(firstLetter.toUpperCase())

      } else {

        setfirstLetter(firstLetter)
      }
    }
  }

  const menuSvgProps = {
    isShown,
    setIsShown
  }

  return (
    <>

      <nav className='nav-bar-conatiner flex-ac  full'
        style={isHomePage ? { position: 'fixed', width: '100%' } : {display:isDashboard&&'none'}}>
        <section className='nav-bar-warpper flex-sb' >

          <div className='user-area-container flex-col'>
            {session?.user?.image ?
              <Image src={session?.user?.image} alt={'login-indication'} width={30} height={30} className='user-img' />
              :
              firstLetter ?
                <div className='custom-login-indication flex-jc-ac'>{firstLetter}</div> : <div className='place-holder-for-no-login-indication'></div>
            }


          </div>
          <div className='logo-container pointer' onClick={handelLogoClicked}>
            <Image className='logo'  alt={'logo'} width={200} height={90} src={'/logo.png'} />
          </div>
          <div className='main-menu-btn flex-jc-ac gap05'>
            {isShown ?
              <CloseSvg {...menuSvgProps} /> :
              <MenuSvg {...menuSvgProps} />
            }
          </div>

        </section>
      </nav>
      <MainMenu isShown={isShown} setIsShown={setIsShown} />
    </>
  )
}