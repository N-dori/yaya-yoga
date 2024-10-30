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
    <section className='main-menu-list-conatiner'
    style={isShown?{}:{transform:`translate(8em)`}}
    >
      <h2 className='headline'>יאיא יוגה</h2>
        <ul className='menu-list grid clean gap2'>
          {session?.user?.name?
          `שלום ${session.user.name}`:
          <div className='signin-login flex-col gap05'>
        <li className='pointer' onClick={()=> handelClick('/login')}  >התחברות </li>
        <li className='pointer' onClick={()=> handelClick('/signup')}  >צור חשבון </li>
          </div>}
        <li  onClick={()=> handelClick('/weekly_schedule')} > מערכת שיעורים שבועית</li>
        <li onClick={()=> handelClick('/dashboard')}>dashboard </li>
        <li onClick={()=> handelClick('/pricing')}>מחירים </li>
        <li className='pointer' onClick={handleSignOut}>יציאה מהחשבון </li>
        </ul></section>
  )
}