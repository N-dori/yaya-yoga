'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { getLastUserId } from '../utils/util'

type Props = {}

export default function WelcomeNewUser({}: Props) {
    
  const router  =useRouter()
  useEffect(() => {
   
    redirectToWelcomeNewUser()

  }, [])
  const redirectToWelcomeNewUser = async () => {
      const userId = await getLastUserId()
      router.push(`welcome/${userId}`)

  }
  return (
<></>
)
}