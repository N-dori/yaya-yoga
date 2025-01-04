'use client'
import React, { useEffect, useState } from 'react'
import CircleDeroration from './CircleDeroration'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch } from '@/app/libs/hooks'
import { signIn, useSession } from 'next-auth/react'
import { getFullUserByEmail, getUserByEmail } from '@/app/utils/util'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { createUser } from '@/app/actions/userActions'
import { Tuser } from '@/app/types/types'
import Spinner from '../Spinner'

type LogInSignupProps = {
    redirectTo?: string
    origin?: string
}

export default function LogInSignup({ redirectTo, origin }: LogInSignupProps) {

    const [name, setName] = useState("")
    const [nameInError, setNameInError] = useState(false)
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [passwordInError, setPasswordInError] = useState(false)
    const [email, setEmail] = useState("")
    const [emailInError, setEmailInError] = useState(false)
    const [error, setError] = useState("")
    const [passwarderror, setPasswardError] = useState("")
    const [passward2error, setPassward2Error] = useState("")
    const [isLoading, setIsLoading] = useState<{ btn1: boolean, btn2: boolean }>({ btn1: false, btn2: false })

    const [isItGoogleSignup, setIsItGoogleSignup] = useState<boolean>(false)
    const path = usePathname()

    const router = useRouter()
    const dispatch = useAppDispatch()
    const { data: session, status } = useSession();
    useEffect(() => {
        checkIfNewUser()

    }, [session?.user?.email, isItGoogleSignup])


    const checkIfNewUser = async () => {
        // is best prctice status === "authenticated" tells us if session is ready we dont want the function to run premturely
        if (status === "authenticated") {

            const userFound: Tuser = await getFullUserByEmail(session.user.email)
            if (!userFound) {
                const name = session.user.name
                const email = session.user.email
                const user = await createUser({ name, email, isNewUser: true, isAdmin: false })
                router.push(`/welcome/${user._id}`)
                return
            }
            if (userFound.isNewUser) {
                router.push(`/welcome/${userFound?._id}`)
            } else {
                if(origin === 'workshops-login')return 
                router.push('/')
            }
            setIsLoading(prevState => ({ ...prevState, btn1: false, btn2: false }))
        }
    }


    const handelGoogleRegisration = async () => {

        setIsLoading(prevState => ({ ...prevState, btn2: true }))
        await signIn('google', { redirect: false })

    }

    const getUserMsg = (txt: string, isSucsses: boolean) => {

        dispatch(callUserMsg({ msg: txt, isSucsses: false }))

        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);

    }

    const isPasswordValid = (value: string) => {
        setPassword(value)
        if (value.length < 4) {
            setPasswardError('יש לבחור סיסמא עם 4 תווים לפחות ')
            return false
        } else {
            setPasswardError('')
            return true
        }
    }


    const handelLoginSubmit = async (e: any) => {
        e.preventDefault()
        e.stopPropagation()

        if (!password || !email) {
            if (!password) handelOnError('יש להרשם עם סיסמא תקנית', 'password')
            if (!email) handelOnError('יש להרשם עם כתובת אי-מייל חוקית', 'email')
            return
        }
        try {
            const passwordValid = isPasswordValid(password)
            if (!passwordValid) {
                setPasswardError('יש להרשם עם סיסמא תקנית')
                return
            }

            setIsLoading(prevState => ({ ...prevState, btn1: true }))
            const res = await signIn('credentials', {
                email, password, redirect: false
            })

            if (res?.error) {
                let txt = "פרטים אינם נכונים נסה שוב"
                const form = e.target
                form.reset()
                getUserMsg(txt, false)
                return
            }

        } catch (err) {
            console.log('had a problom...');

        }
    }

    const handelSignUpSubmit = async (e: any) => {
        e.preventDefault()

        if (!name || !password || !email) {
            if (!name) handelOnError('בבקשה למלא שם מלא', 'name')
            if (!password) handelOnError('יש להרשם עם סיסמא תקנית', 'password')
            if (!email) handelOnError('יש להרשם עם כתובת אי-מייל חוקית', 'email')
            return
        }
        const passwordValid = isPasswordValid(password)
        try {
            if (!passwordValid) {
                setPasswardError('יש להרשם עם סיסמא תקנית')
                return
            }
            const passwordMatch = isAmatch(password2)
            if (!passwordMatch) {
                setPasswardError('סיסמא לא תואמת')
                setPassward2Error('סיסמא לא תואמת')

                return
            }
            const userExists = await getUserByEmail(email)
            if (!userExists) {

                const newUser = await createUser({ name, email, isNewUser: true, password, isAdmin: false })
                const result = await signUserIn()

            } else {

                getUserMsg('משתמש קיים במערכת', false)

            }

            const form = e.target
            form.reset()

        }
        catch (err) {
            console.log(err, ' could not ...');
        }

    }

    const signUserIn = async () => {

        const res = await signIn('credentials', {
            email, password, redirect: false
        })
        return res

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

    const isAmatch = (value: string) => {
        setPassword2(value)
        if (value === password) {
            setPasswardError('')
            setPassward2Error('')

            if (!isPasswordValid(password)) {
                setPasswardError('יש לבחור סיסמא עם 4 תווים לפחות ')

            }

            return true

        } else {
            setPassward2Error('סיסמא לא תואמת')
            return false
        }
    }



    return (
        <main className='signup-container flex-col flex-jc-ac full gap1'>
            {
                path === '/signup' ?
                    <section className='flex-col gap2'>
                        <h2 className='title tac '>צור חשבון חדש</h2>
                        <Link className="link-to-login" href={'/login'}><small>רשום כבר במערכת? לחץ כאן להתחברות </small></Link>
                    </section>
                    :
                    <section className='flex-col gap2'>
                        <h2 className='title tac'>התחברות</h2>
                        <Link className='link-to-login' href={'/signup'}>לא רשום עדיין? לחץ כאן</Link>
                    </section>

            }

            <form onSubmit={path === '/signup' ? handelSignUpSubmit : handelLoginSubmit} className='signup-form flex-col flex-jc gap1'>
                {path === '/signup' &&
                    <label className="input-label flex-col" htmlFor="name">
                        שם
                        <input name="name"
                            style={nameInError ? { border: '1px solid red' } : {}}
                            onChange={(e) => setName(e.target.value)}
                            className={error ? 'form-input on-error' : 'form-input'}
                            type='text' placeholder={error ? error : 'שם מלא'} ></input>
                    </label>
                }

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
                        onChange={(e) => isPasswordValid(e.target.value)}
                        className={error ? 'form-input on-error' : 'form-input'}
                        type='password' placeholder={path === '/signup' ? ' בחר סיסמא (לפחות 4 תווים)' : ' הכנס סיסמא '} ></input>
                </label>
                {passwarderror && <small className='password-error '>{passwarderror}</small>}

                {path === '/signup' &&
                    <label className="input-label flex-col" htmlFor="password">

                        <input name="password"
                            style={passwordInError ? { border: '1px solid red' } : {}}
                            onChange={(e) => isAmatch(e.target.value)}
                            className={error ? 'form-input on-error' : 'form-input'}
                            type='password' placeholder={' הקלד סיסמא פעם נוספת '} ></input>
                    </label>
                }
                {passward2error && <small className=' password-error '>{passward2error}</small>}


                {path === '/signup' ?
                    <button type='submit' className="login-btn flex-jc-ac pointer">{isLoading.btn1 ? <Spinner /> : <span>רשום אותי</span>}  </button>
                    :
                    <button type='submit' className='login-btn flex-jc-ac pointer'>{isLoading.btn1 ? <Spinner /> : <span>התחבר</span>}  </button>
                }

                <h2 className="or tac">או</h2>
                <button type='button' onClick={handelGoogleRegisration}
                    className={`google-btn ${!isLoading.btn2 && 'flex-sb'} pointer`}>
                    {
                        path === '/signup' ?
                            <span className='flex-jc-ac'>{isLoading.btn2 ? <Spinner /> : <span>צור חשבון עם גוגל</span>} </span>
                            :
                            <span className='flex-jc-ac'>{isLoading.btn2 ? <Spinner /> : <span>התחבר עם גוגל</span>} </span>
                    }

                    {
                        !isLoading.btn2 ?
                            <Image src={'/googleSymbol.png'} alt={'google symbol'} width={40} height={40}></Image>
                            :
                            <></>
                    }
                </button>

                <CircleDeroration />
            </form>

        </main>
    )
}