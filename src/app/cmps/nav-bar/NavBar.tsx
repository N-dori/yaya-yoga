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

type Props = {}
export default function NavBar({ }: Props) {
  const [firstLetter, setfirstLetter] = useState("")
  const { data: session } = useSession()
  const router = useRouter();
  const dispatch = useDispatch()
  const currentUser =  useAppSelector(state => state.currUserSlice.user)

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

  // useEffect(() => {
    // if(currentUser === null){
      
  //  console.log('setting CurrUser In Store',currentUser);
    // setCurrUserInStore()
  //  }

  // }, [session?.user?.email]);

  // const setCurrUserInStore = async () => 
  //   {
  //     const user = await getFullUserByEmail(session?.user?.email);
  //     console.log('user in navBar', user);
  //     if(user === null ){
  //       const user = await getFullUserByEmail(session?.user?.email);
  //       dispatch(setUser(user))

  //     }    
  //     dispatch(setUser(user))
  //   }

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