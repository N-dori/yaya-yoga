'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import MainMenu from './MainMenu'
import { useSession } from 'next-auth/react'

type Props = {}
export default function NavBar({ }: Props) {
  const [firstLetter, setfirstLetter] = useState("")
  const { data: session } = useSession()

  useEffect(() => {
    getUserFirstLetter()
    // console.log('currnt user : ',session?.user );
   

  }, [session?.user?.name])
 const getUserFirstLetter = () => {
  setfirstLetter(session?.user?.name?session?.user?.name[0].toUpperCase():"")
 } 
  return (
    <nav className='nav-bar flex-sb  full'>
      <MainMenu />

      <div className='user-area-container flex-col'>
      {session?.user?.image?
       <Image src={session?.user?.image} alt={'user-image'} width={40} height={40} className='user-img'/>
      :
      firstLetter? <div className='user-custom-img flex-jc-ac'>{firstLetter}</div>:<></>
      }  
       

      </div>

    </nav>
  )
}