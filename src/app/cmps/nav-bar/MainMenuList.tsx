import { SignoutSvg } from '@/app/assets/SignoutSvg'
import { CalenderSvg } from '@/app/assets/svgs/CalenderSvg'
import CerditCardSvg from '@/app/assets/svgs/CerditCardSvg'
import CloseMenuSvg from '@/app/assets/svgs/CloseMenuSvg'
import DetailsSvg from '@/app/assets/svgs/DetailsSvg'
import { Loging } from '@/app/assets/svgs/Loging'
import LoginSvg from '@/app/assets/svgs/LoginSvg'
import { PencilSvg } from '@/app/assets/svgs/PencilSvg'
import SignUpSvg from '@/app/assets/svgs/SignUpSvg'
import { YogaSvg } from '@/app/assets/svgs/YogaSvg'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
type Props = {
  isShown:boolean
  setIsShown: (isShown: boolean) => void
}

export default function MainMenuList({isShown ,setIsShown}: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isAdmin,setIsAdmin] = useState(null)
  useEffect(() => {
    setAdmin()
    
  }, [session?.user?.email])
 const setAdmin = () => {
  setIsAdmin(session?.user?.email ==='yshwartz@gmail.com'||session?.user?.email==='dori.nadav@gmail.com')
 } 

  const handelClick = (route:string) => {
    setIsShown(!isShown)
    router.replace(route)
  }
  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: '/' }); // Example of how to use signOut properly
    router.push('/'); // Redirect to homepage after sign out
  }
  return (
    <section className='main-menu-list-conatiner flex-ac flex-col tac'>
      <h2 className='headline'>יאיא יוגה</h2>
        <ul className='menu-list grid clean '>
          {session?.user?.name?
          <>
          <li className='greeting gr1'>{`שלום,`}<br></br>{session?.user?.name}</li>
          <li className='pointer gr2 flex-sb'onClick={()=> handelClick('/personalDetails')} > לאיזור האישי <DetailsSvg/></li>
          </>
          :
          <>
          <li className='pointer flex-sb gr1' onClick={()=> handelClick('/login')}  >התחברות <Loging/></li>
          <li className='pointer flex-sb gr2' onClick={()=> handelClick('/signup')}  >צור חשבון <SignUpSvg/> </li>
          
          </>
          
          }

        <li className='gr3 flex-sb' onClick={()=> handelClick('/weekly_schedule')} >לוח זמנים שבועי <CalenderSvg/></li>
        <li className='gr4 flex-sb' onClick={()=> handelClick('/pricing')}>מחירון <CerditCardSvg/></li>
        <li className='gr5 flex-sb' onClick={()=> handelClick('/workshops')}>סדנאות <YogaSvg/></li>
{   isAdmin&&  <li className='gr6 flex-sb' onClick={()=> handelClick('/dashboard')}>ניהול מערכת <PencilSvg/></li>}
        <li className='pointer gr7 flex-sb' onClick={handleSignOut}>יציאה מהחשבון <SignoutSvg/></li>
        <CloseMenuSvg isShown={isShown} setIsShown={setIsShown} />
        </ul>
      
        </section>
  )
}