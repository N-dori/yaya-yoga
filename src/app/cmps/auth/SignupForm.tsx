"use client"

import { getUrl, getUserByEmail } from "@/app/util"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CircleDeroration from "./CircleDeroration"
import { useAppDispatch } from "@/app/libs/hooks"
import { callUserMsg, hideUserMsg } from "@/app/store/features/msgSlice"

type Props = {}

export default function SignupForm({ }: Props) {

  const [name, setName] = useState("")
  const [nameInError, setNameInError] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordInError, setPasswordInError] = useState(false)
  const [email, setEmail] = useState("")
  const [emailInError, setEmailInError] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()
  const dispatch = useAppDispatch()


  const handelSubmit = async (e: any) => {
    e.preventDefault()

    if (!name || !password || !email) {
      if (!name) handelOnError('בבקשה למלא שם מלא', 'name')
      if (!password) handelOnError('יש להרשם עם סיסמא תקנית', 'password')
      if (!email) handelOnError('יש להרשם עם כתובת אי-מייל חוקית', 'email')
      return
    }
    const userExists = await getUserByEmail(email)
    console.log('userExists',userExists);
    
    if (userExists) {
      let txt = 'משתמש קיים במערכת'
      dispatch(callUserMsg({ msg: txt, isSucsses: false }))
      const form = e.target
      form.reset()
      setTimeout(() => {
        dispatch(hideUserMsg())
      }, 3500);
      return
    }

    try {
      const url = getUrl('auth/registration/')


      const res = await fetch(url, {

        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ name, email, password, isNewUser:true, isAdmin: false })

      },
      )
      if (res.ok) {
        const form = e.target
        form.reset()
        signUserIn()
      } else {
        throw new Error('faild to create new user')
      }

    }
    catch (err) {
      console.log(err, ' could not ...');
    }

  }
  const signUserIn = async () => {
   const res =   await signIn('credentials', {
      email, password, redirect: false
    })
  }
 

  const handelGoogleRegistion = async () => {
    

      const res = await signIn('google')
 
  }

  const handelOnError = (msg: string, field: string) => {
    if (!name && !password && !email) {
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
      setNameInError(false)
      setPasswordInError(false)
      setEmailInError(false)
    }, 4000)

  }
  const commandForError = {
    "name": () => setNameInError(!nameInError),
    "password": () => setPasswordInError(!passwordInError),
    "email": () => setEmailInError(!emailInError),

  }


  return (
    <main className='signup-container flex-col flex-jc-ac gc2 gap1'>

      <h2 className='title tac '>צור חשבון חדש</h2>
      <Link className="link-to-login" href={'/login'}><small>רשום כבר במערכת? לחץ כאן להתחברות </small></Link>

      <form onSubmit={handelSubmit} className='signup-form flex-col flex-jc gap1'>
        <label className="input-label flex-col" htmlFor="name">
          שם
          <input name="name"
            style={nameInError ? { border: '1px solid red' } : {}}
            onChange={(e) => setName(e.target.value)}
            className={error ? 'form-input on-error' : 'form-input'}
            type='text' placeholder={error ? error : 'שם מלא'} ></input>
        </label>
        <label className="input-label flex-col" htmlFor="password">
          סיסמא
          <input name="password"
            style={passwordInError ? { border: '1px solid red' } : {}}
            onChange={(e) => setPassword(e.target.value)} 
            className={error ? 'form-input on-error' : 'form-input'}
            type='password' placeholder={error ? error : 'לפחות 4 תווים'} ></input>
        </label>
        <label className="input-label flex-col" htmlFor="email">
          כתובת מייל
          <input name='email' 
          style={emailInError ? { border: '1px solid red' } : {}} 
          onChange={(e) => setEmail(e.target.value)} 
          className={error ? 'form-input on-error' : 'form-input'} type='email' 
          placeholder={error ? error : 'example@gmail.com'} ></input>

        </label>

        <button type='submit' className="login-btn"> רשום אותי </button>
        <h2 className="or tac">או</h2>
        <button type='button' onClick={handelGoogleRegistion}
          className='google-btn flex-jc-ac pointer'>
          צור חשבון עם גוגל
          <Image src={'/googleSymbol.png'} alt={'G'} width={40} height={40}></Image>  </button>

        <CircleDeroration />
      </form>

    </main>
  )
}