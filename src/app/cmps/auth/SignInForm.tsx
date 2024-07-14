"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type Props = {}

export default function SignInForm({}: Props) {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
  
    const router = useRouter()
  
    const handelSubmit = async (e: any) => {
      e.preventDefault()
  
      if (!name  || !password || !email) {
        setError('בבקשה למלא את כל השדות')
        setTimeout(() => {
          setError('')
        }, 30000)
        return
      }
      const userExists = await getUserByEmail(email)
      if (userExists) {
        setError('משתמש קיים במערכת ')
        const form = e.target
        form.reset()
        setTimeout(() => {
          setError('')
        }, 30000)
        return
      }
  
      try {
        const res = await fetch('http://localhost:3000/api/auth/registration/', {
  
          method: 'POST',
          headers: { "Content-type": "appliction/json" },
          body: JSON.stringify({ name, email, password, isAdmin: false })
  
        },
        )
        if (res.ok) {
          const form = e.target
          form.reset()
          const res =  await signIn('credentials', {
            email, password , redirect:false
                                                   })
          router.push('/')
        } else {
          throw new Error('faild to create new user')
        }
  
      }
      catch (err) {
        console.log(err, ' could not ...');
      }
  
    }
  
    const getUserByEmail = async (email: String) => {
  
      const res = await fetch('http://localhost:3000/api/auth/userExists/', {
  
        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ email })
      })
      const { user } = await res.json()
      console.log(' userExists', user);
      return user
    }
  
    const handelGoogleRegistion = async () => {

        const res = await signIn('google')
      
        }
    return (
      <main className='signup-container flex-col flex-jc-ac gc2 gap1'>
        <form onSubmit={handelSubmit} className='signup-form flex-col flex-jc gap1'>
          <h2 className='title tac '>הרשמה</h2>
          <input onChange={(e) => setName(e.target.value)} className='form-input' type='text' placeholder='שם' ></input>
          <input onChange={(e) => setPassword(e.target.value)} className='form-input' type='password' placeholder='סיסמא' ></input>
          <input onChange={(e) => setEmail(e.target.value)} className='form-input' type='email' placeholder='מייל בבקשה' ></input>
          {error ? <section className='error-box tac'>{error}</section> : ''}
          <button type='submit' className="login-btn"> התחבר </button>
        <button type='button' onClick={ handelGoogleRegistion}
         className='google-btn flex-jc-ac pointer'>
        התחבר עם גוגל 
        <Image src={'/google_img.jpg'} alt={'G'} width={40} height={40}></Image>  </button>
        </form>
        <Link href={'/login'}>רשום כבר במערכת? לחץ כאן להתחברות </Link>
      </main>
    )
}