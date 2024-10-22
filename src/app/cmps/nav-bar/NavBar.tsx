'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MainMenu from './MainMenu'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getUserByEmail } from '@/app/utils/util'

type Props = {}
export default function NavBar({ }: Props) {
  const [firstLetter, setfirstLetter] = useState("")
  const { data: session } = useSession()
  const router = useRouter();

  
  useEffect(() => {
    getUserFirstLetter()
    const checkUserAndRedirect = async () => {
      if (session?.user?.email) {
        const isNewUser = await checkIfNewUser(); 
        if (isNewUser) {
          router.push(`/welcome/${isNewUser}`);
        }
      }
    };
  
    checkUserAndRedirect();
  }, [session?.user?.email]);
  
  const checkIfNewUser = async () => {
    const miniUser = await getUserByEmail(session?.user?.email);
    console.log('user in navBar', miniUser);
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
  return (
    <nav className='nav-bar flex-sb  full'>
      <MainMenu />
      <div className='user-area-container flex-col'>
        {session?.user?.image ?
          <Image src={session?.user?.image} alt={'user-image'} width={40} height={40} className='user-img' />
          :
          firstLetter ? <div className='user-custom-img flex-jc-ac'>{firstLetter}</div> : <></>
        }


      </div>

    </nav>
  )
}