'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MainMenu from './MainMenu'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getFullUserByEmail, getUserByEmail } from '@/app/utils/util'
import { useDispatch } from 'react-redux'
import { setUser } from '@/app/store/features/userSlice'
import {  useAppSelector  } from '../../libs/hooks'
import CloseSvg from '@/app/assets/svgs/CloseSvg'
import Link from 'next/link'
import MenuSvg from '@/app/assets/svgs/MenuSvg'

type Props = {}
export default function NavBar({ }: Props) {
  const [isShown, setIsShown] = useState(false)
  const [firstLetter, setfirstLetter] = useState("")
  const { data: session } = useSession()
  const router = useRouter();
  

  useEffect(() => {
    getUserFirstLetter()
   
    const checkUserAndRedirect = async () => {
      if (session?.user?.email) {
        const userId = await checkIfNewUser(); 
        if (userId) {
          router.push(`/welcome/${userId}`);
        }
      }
    };
    checkUserAndRedirect();
    
  }, [session?.user?.email]);


  const checkIfNewUser = async () => {
    const miniUser = await getUserByEmail(session?.user?.email);
    if (miniUser) {
      if (miniUser.isNewUser) {// here we chack if the user is a new user or not
        return miniUser._id; 
      } else {
        return false; 
      }
    }
    return false; // Return false if no user
  };
  const getUserFirstLetter = () => {
    setfirstLetter(session?.user?.name ? session?.user?.name[0].toUpperCase() : "")
  }
  const menuSvgProps = {
    isShown,
    setIsShown
  }
  return (
    <>
    
    <nav className='nav-bar-conatiner flex-ac  full'>
<section className='nav-bar-warpper flex-sb' >

      <div className='user-area-container flex-col'>
        {session?.user?.image ?
          <Image src={session?.user?.image} alt={'user-image'} width={40} height={40} className='user-img' />
          :
          firstLetter ? <div className='user-custom-img flex-jc-ac'>{firstLetter}</div> : <></>
        }


      </div>
      <Link href={'/'}>לוגו</Link>
      <div className='main-menu-btn flex-jc-ac gap05'>
           { isShown?
            <CloseSvg {...menuSvgProps}/>:
            <MenuSvg {...menuSvgProps} />
          }
          </div>

</section>
    </nav>
        <MainMenu isShown={isShown} setIsShown={setIsShown}/>
    </>
  )
}