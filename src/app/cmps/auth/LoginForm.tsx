'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CircleDeroration from './CircleDecoration'
import { useAppDispatch } from '@/app/libs/hooks'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { getFullUserByEmail, getUserByEmail } from '@/app/utils/util'
import { Tuser } from '@/app/types/types'
type LoginFormProps = {
  redirectTo?: string
}

export default function LoginForm({ redirectTo }: LoginFormProps) {

  const [password, setPassword] = useState("")
  const [passwordInError, setPasswordInError] = useState(false)

  const [email, setEmail] = useState("")
  const [emailInError, setEmailInError] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: session } = useSession()

  useEffect(() => {
    checkIfNewUser()

  }, [session?.user?.email])


  const handelSubmit = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.value === 'google') return
    if (!password || !email) {
      if (!password) handelOnError('יש להרשם עם סיסמא תקנית', 'password')
      if (!email) handelOnError('יש להרשם עם כתובת אי-מייל חוקית', 'email')
      return
    }
    try {
      const res = await signIn('credentials', {
        email, password, redirect: false
      })
      if (res?.error) {
        let txt = "פרטים אינם נכונים נסה שוב"
        dispatch(callUserMsg({ msg: txt, isSucsses: false }))
        const form = e.target
        form.reset()
        setTimeout(() => {
          dispatch(hideUserMsg())
        }, 3500);
        return
      }
      router.push('/')
    } catch (err) {
      console.log('had a problom...');

    }
  }
  const checkIfNewUser = async () => {
    if (session?.user?.email) {
      const user: Tuser = await getFullUserByEmail(session.user.email)
      if (user.isNewUser) {
        router.push(`/welcome/${user._id}`)
      } else {
        router.push('/')

      }

    }
  }

  const handelGoogleRegistion = async () => {

    const res = await signIn('google')

  }

  const handelOnError = (msg: string, field: string) => {
    if (!password && !email) {
      let txt = 'בבקשה למלא את כל השדות'
      setError(txt)
      resetErrors()
      return
    }
    commandForError[field]()
    setError(msg)
    resetErrors()

  }

  const resetErrors = () => {
    setTimeout(() => {
      setError('')
      setPasswordInError(false)
      setEmailInError(false)
    }, 4000)

  }
  const commandForError = {
    "password": () => setPasswordInError(!passwordInError),
    "email": () => setEmailInError(!emailInError),

  }
  return (
    <main className='signup-container flex-col flex-jc-ac full gap1'>
      <h2 className='title tac'>התחברות</h2>
      <Link className='no-signup-yet' href={'/signup'}>לא רשום עדיין? לחץ כאן</Link>

      <form onSubmit={handelSubmit} className='signup-form flex-col flex-jc gap1'>


        <label className="input-label flex-col" htmlFor="email">
          כתובת מייל
          <input name='email'
            style={emailInError ? { border: '1px solid red' } : {}}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? 'form-input on-error' : 'form-input'} type='email'
            placeholder={error ? error : 'example@gmail.com'} ></input>


        </label>

        <label className="input-label flex-col" htmlFor="password">
          סיסמא
          <input name="password"
            style={passwordInError ? { border: '1px solid red' } : {}}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? 'form-input on-error' : 'form-input'}
            type='password' placeholder={error ? error : 'לפחות 4 תווים'} ></input>
        </label>

        {/* {error && <span className='error'>{error}</span>} */}

        <button type='submit' className='login-btn '> התחבר </button>
        <button type='button' onClick={handelGoogleRegistion} value={'google'} className='google-btn flex-jc-ac pointer'> התחבר עם גוגל
          <Image src={'/googleSymbol.png'} alt={'G'} width={40} height={40}></Image>  </button>

        <CircleDeroration />
      </form>

    </main>
  )
}