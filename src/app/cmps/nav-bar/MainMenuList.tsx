import CloseMenuSvg from '@/app/assets/svgs/CloseMenuSvg'
import CloseSvg from '@/app/assets/svgs/CloseSvg'
import MenuSvg from '@/app/assets/svgs/MenuSvg'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
type Props = {
  isShown:boolean
  setIsShown: (isShown: boolean) => void
}

export default function MainMenuList({isShown ,setIsShown}: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
  
  }, [session?.user?.name])
  
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
          <div className='gr1' onClick={()=> handelClick('/personalDetails')}>
            <li className='user-name'>{`שלום ${session.user.name}`}</li>
            <li className='pointer' >לאיזור האישי</li>

          </div>
          :
          <div className='signin-login gr1 flex-col gap05'>
        <li className='pointer' onClick={()=> handelClick('/login')}  >התחברות </li>
        <li className='pointer' onClick={()=> handelClick('/signup')}  >צור חשבון </li>
          </div>
          }

        <li  className='gr2' onClick={()=> handelClick('/weekly_schedule')} > מערכת שיעורים שבועית</li>
        <li className='gr3' onClick={()=> handelClick('/dashboard')}>dashboard </li>
        <li className='gr4' onClick={()=> handelClick('/pricing')}>מחירים </li>
        <li className='pointer gr5' onClick={handleSignOut}>יציאה מהחשבון </li>
        <CloseMenuSvg isShown={isShown} setIsShown={setIsShown} />
        </ul>
        <div style={{marginTop:'auto'}}>
        </div>
        </section>
  )
}