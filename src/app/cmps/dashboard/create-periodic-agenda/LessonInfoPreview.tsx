import { Tactivity, Tmembership, Tpractitioner, Tuser } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import LessonInfoHoursRange from './LessonInfoHoursRange'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import {  getFullUserByEmail, getMembership, getUrl, removeUserMembership } from '@/app/utils/util'
import { useDispatch } from 'react-redux'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { useRouter } from 'next/navigation'
import { AlertBox } from '../../AlertBox'
import PractitionersCircleIndex from '../../weekly-schedule/PractitionersIndex'

type LessonInfoPreviewProps = {
    activity: Tactivity
    isOnWeeklyScheduleMode?: boolean
    handelLessonCancelation: (id: string, isCanceled: boolean, lastDate: Date | null | undefined) => void
    periodicAgendaId?: string
    onBooking?: () => void
    setActivities: (activities: Tactivity[]) => void
    activities: Tactivity[]

}

export function LessonInfoPreview({ setActivities, activities, onBooking, periodicAgendaId, isOnWeeklyScheduleMode, activity, handelLessonCancelation }: LessonInfoPreviewProps) {
    const [isAlertBoxShown, setIsAlertBoxShown] = useState(false)
    const [userMsg, setUserMsg] = useState('')
    const [btnTxt, setBtnTxt] = useState('')
    const router = useRouter()

    const { data: session } = useSession()
    const dispatch = useDispatch()
    const [currUser, setCurrUser] = useState<Tuser>(null)
    useEffect(() => {
        // if(session?.user?.email){
        //     setcurrUserState()

        // }
    }, [activity.date, activity.isCanceled, activity.id, periodicAgendaId,currUser,currUser?.memberships?.length])
    const setcurrUserState = async () => {
        if (!currUser ) {
            const user = await getFullUserByEmail(session.user.email)
            console.log('user use State  :', user)
            setCurrUser(user)

        }

    }
    const handelClick = () => {

        handelLessonCancelation(activity.id, activity.isCanceled, activity.date)

    }

    const getUserMsg = (txt: string, isSucsses: boolean) => {
        window.scrollTo(0, 0)
        dispatch(callUserMsg({ msg: txt, isSucsses }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }  
      const handelSignInToClass = async () => {
        //0. if user is not logged-in planLogin view
        if (session?.user?.email) {
            let nameOfUser =session?.user?.name
            const user:Tuser = await getFullUserByEmail(session.user.email)
            setCurrUser(prevUser=>{return{...user}})
            const userMembership = user.memberships[0]
            if (!userMembership || userMembership.length === 0) {
                //0. if user have no active membership .
                let msg = `היי ${ nameOfUser? nameOfUser : ""} על פי רישומיינו אין ברשותך מנוי פעיל בכדי להשלים את פעולת ההרשמה יש צורך לרכוש מנוי`
                let btnTxt = 'לרכישת מנוי'
                getAlertBox(msg, btnTxt)
                return
            } else {
                // asking user to verify hours and place using AlerBox, 
                // 1. call handelChargeUser() and getting his membership from dataBase

                const timeOptions: Intl.DateTimeFormatOptions = {
                    hour: '2-digit',       // Ensures 2-digit hour format
                    minute: '2-digit',     // Ensures 2-digit minute format
                    hour12: false
                }
                let msg = `היי ${nameOfUser ? nameOfUser : ""} איזה כיף!! לצרף אותך לשיעור ${activity.name} בין השעות ${new Date(activity.hoursRange.start).toLocaleTimeString('he-IL', timeOptions)} - ${new Date(activity.hoursRange.end).toLocaleTimeString('he-IL', timeOptions)} אצלנו בסטודיו ${activity.location}?`
                let btnTxt = 'בטח רשום אותי!'
                getAlertBox(msg, btnTxt)


            }

        } else {
            onBooking()
            console.log('in order to sign in you must login first !',);
        }

    }
    const getAlertBox = (userMsg: string, btnTxt: string,) => {        
        setUserMsg(userMsg)
        setBtnTxt(btnTxt)
        setIsAlertBoxShown(true)

    }

    const handelChargeUser = async () => {

        const user = await getFullUserByEmail(session.user.email)

        if (user) {
            // after getting user first membership we check expiry date 
            const membershipId = user.memberships[0]
            console.log('sanding to getMembership',membershipId);
            
            const membership: Tmembership = await getMembership(membershipId)
            //if membership expired we give alert box messege and return
            console.log('membership :',membership)
            if (membership?.end) {
                const today = new Date()
                console.log('membership.end < today :', new Date(membership.end) < today)
                if ((new Date(membership.end) < today)||membership.isExpired) {
                    let msg = `היי ${user ? user?.name : ""}  על פי רישומיינו המנוי שברשותך אינו בתוקף  `
                    let btnTxt = 'לרכישת מנוי'
                    getAlertBox(msg, btnTxt)
                    const userAfterRemovingMembership = await removeUserMembership(currUser._id)
                        updateClientSideUser(userAfterRemovingMembership)                    
                    return
                }

            }
            //if membership have not expired yet /chargeMembership handel membership updates (charging..)
            const url = getUrl('membership/chargeMembership')
            const res = await fetch(url, {
                method: 'PUT',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ membershipId })
            })
            if (res.ok) {
                //here we get the updated Membership after "charging" and check:
                //1. if entries === 1 we send an email to renvue
                //2. if membership Expired -we remove it from user subscription array

                const updatedMembership: Tmembership = await res.json()
                if (updatedMembership.subscription.entries === 1) {
                    console.log('send email you have left last entery consider getting a new one');

                }
                if (updatedMembership.isExpired) {
                    console.log(' membership has expired !',updatedMembership)
                    updatedMembership.subscription.type==='drop-in'? addPractitionerToActivity():''
                    // fetch to remove membershipId from array and shift it 
                    const userAfterRemovingMembership = await removeUserMembership(user._id)
                   
                        // update client side user to match the user in database so user can not signup to class 
                        console.log('user After Removing Membership', userAfterRemovingMembership);
                        updateClientSideUser(userAfterRemovingMembership)
                        return
                    
                }
                console.log('updatedMembership', updatedMembership);

                addPractitionerToActivity()
            }
        }

    }
    const navigatToPricing = () => {
        router.replace('/pricing')
    }
    let alertBoxProps = {
        isAlertBoxShown, setIsAlertBoxShown,
        userMsg, setUserMsg,
        btnTxt, setBtnTxt,
        navigatToPricing,
        handelChargeUser,
    }

    const addPractitionerToActivity = async () => {
        const url = getUrl('periodicAgenda/updatePeriodicAgendaPractitioners')
        const res = await fetch(url, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                periodicAgendaId,
                activityId: activity.id,
                email: session?.user?.email,
                name: session?.user?.name
            })
        })
        if (res.ok) {
            let txt = `הרשמתך לשיעור ${activity.name} עברה בהצלחה נתראה על המזרן 🙏 `
            getUserMsg(txt, true)
            updateClientSideActivities()



        } else {
            let txt = `הייתה בעייה ברישום לשיעור, נסו מאוחר יותר`
            getUserMsg(txt, true)

        }
    }
   

    const updateClientSideActivities = () => {
        const activityToUpdate = activities.find(act => act.id === activity.id)
        let practitioner: Tpractitioner = { email: session?.user?.email, name: session?.user?.name }
        activityToUpdate.practitioners.push(practitioner)
        const index = activities.findIndex(act => act.id === activity.id)
        activities[index] = { ...activityToUpdate }
        const updatedActivities = [...activities]
        setActivities(updatedActivities)
    }
    const updateClientSideUser = (updatedUser:Tuser) => {
        setCurrUser({...updatedUser})
    }
    const LessonInfoHoursRangeProps = {
        isCanceled: activity.isCanceled,
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
    }
 
    return (
        <li className='actitity-card-container flex-col clean'>
            <article className='p-1'>
                <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
                {activity.isCanceled && <span > השיעור בוטל</span>}

                <section className='activity-info-container flex-col'>
                    <div style={activity.isCanceled ? { textDecoration: ' line-through' } : {}} className='activity-info mb-1 grid'>
                        <Image className='activity-teacher-img gc1'
                            alt={'teacher-img'} width={50} height={50} src={'https://robohash.org/kkk'} />
                        <div className=' flex-col gc2'>
                            <span className='activity-name gc2'> {activity.name} </span>
                            <span className='activity-teacher-name gc2'> {activity.teacher} </span>
                            <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>

                        </div>
                    </div>
                    <div className='check-in-container flex-sb'>
                        <span style={activity.isCanceled ? { textDecoration: ' line-through' } : {}} className='drop-in'>
                            מחיר כניסה חד פעמית : 50 ש"ח
                        </span>
                        {!isOnWeeklyScheduleMode ? <button style={activity.isCanceled ? { backgroundColor: 'green' } : { backgroundColor: '#cf00009e' }}
                            type='button' className='check-in-button'
                            onClick={() => handelClick()}>{activity.isCanceled ? 'שחזר ' : 'בטל '}
                        </button> :
                            <button type='button' className='sign-in-to-class-btn'
                                onClick={() => handelSignInToClass()}>
                                הרשמה
                            </button>}
                    </div>

                </section>

            </article>
            {

                activity?.practitioners?.length > 0 &&
                <PractitionersCircleIndex practitioners={activity?.practitioners} />

            }
            <AlertBox {...alertBoxProps} />

        </li>
    )
}