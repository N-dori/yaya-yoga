import { Tactivity, Tmembership, Tpractitioner, Tuser } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import LessonInfoHoursRange from './LessonInfoHoursRange'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { getFullUserByEmail, getUrl, isBothTheSameDate, makeId, sendEmail} from '@/app/utils/util'
import { useDispatch } from 'react-redux'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { usePathname, useRouter } from 'next/navigation'
import { AlertBox } from '../../AlertBox'
import Spinner from '../../Spinner'
import PractitionersIndex from '../../weekly-schedule/PractitionersIndex'
import { pushPractitionerToActivity, removePractitionerFromActivityFromDatabase } from '@/app/actions/periodicAgendaActions'
import { refundPractitionerMembershipAtDatabase, removeUserMembership ,getMembership } from '@/app/actions/membershipActions'
import { updateUserWithNewMembershipAtDatabase } from '@/app/actions/userActions'

type LessonInfoPreviewProps = {
    activity: Tactivity
    isOnWeeklyScheduleMode?: boolean
    handelLessonCancellation: (id: string, isCanceled: boolean, lastDate: Date | null | undefined) => void
    periodicAgendaId?: string
    onBooking?: () => void
    setActivities: (activities: Tactivity[]) => void
    activities: Tactivity[]

}

export function LessonInfoPreview({ setActivities, activities, onBooking, periodicAgendaId, isOnWeeklyScheduleMode, activity, handelLessonCancellation }: LessonInfoPreviewProps) {
    const [isAlertBoxShown, setIsAlertBoxShown] = useState(false)
    const [userMsg, setUserMsg] = useState('')
    const [btnTxt, setBtnTxt] = useState('')
    const [isActivityHasPassed, setIsActivityHasPassed] = useState(false)
    const router = useRouter()

    const [currUser, setCurrUser] = useState<Tuser>(null)
    const [currMembershipId, setCurrMembershipId] = useState(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { data: session } = useSession()
    const dispatch = useDispatch()
    const path = usePathname()


    useEffect(() => {
        if (session?.user?.email) {
        }
    }, [activity.date, activity.isCanceled, activity.id, periodicAgendaId, currUser, currUser?.memberships?.length, path, currMembershipId])
    useEffect(() => {
        isActivityPassed()
        console.log('activity.classOrWorkshop', activity.classOrWorkshop);

    }, [])

    const handelClick = () => {

        handelLessonCancellation(activity.id, activity.isCanceled, activity.date)

    }

    const getUserMsg = (txt: string, isSucsses: boolean) => {
        window.scrollTo(0, 0)
        dispatch(callUserMsg({ msg: txt, isSucsses }))
        setTimeout(() => {
            dispatch(hideUserMsg())
        }, 3500);
    }

    const isUserSignedInToClass = (user: Tuser) => {
        const lesson = activities.find(currActivity => currActivity.id === activity.id)
        const isUserFound = lesson.practitioners.some(practitioner => practitioner.email === user.email)
        console.log('isUserFound', isUserFound);

        return isUserFound
    }
    const handelSignInToClass = async () => {
        //0. if user is not logged-in planLogin view
        if (session?.user?.email) {
            let nameOfUser = session?.user?.name
            const user: Tuser = await getFullUserByEmail(session.user.email)
            setCurrUser(prevUser => { return { ...user } })
            //0.1 if have not signed health_decleration 
            if (!user.healthDeclaration) {
                let msg = `היי ${nameOfUser ? nameOfUser : ""} ישנה אפשרות להרשם לשיעורי הסטודיו רק לאחר מילוי טופס הצהרת בריאות, תודה על שיתוף הפעולה. `
                let btnTxt = 'להצהרת בריאות'
                getAlertBox(msg, btnTxt)
                return
            }
            //0.2 if user is already signup to this activity
            if (isUserSignedInToClass(user)) {
                let msg = `היי ${nameOfUser ? nameOfUser : ""} אין אפשרות להירשם לאותו השיעור פעמיים :) `
                let btnTxt = 'הבנתי תודה'
                getAlertBox(msg, btnTxt)
                return
            }
            const userMembership = user.memberships[0]
            if (!userMembership || userMembership.length === 0) {
                //0. if user have no active membership .
                let msg = `היי ${nameOfUser ? nameOfUser : ""} על פי רישומיינו אין ברשותך מנוי פעיל בכדי להשלים את פעולת ההרשמה יש צורך לרכוש מנוי`
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
                let msg = `היי ${nameOfUser ? nameOfUser : ""} איזה כיף!! לצרף אותך לשיעור ${activity.name} בין השעות ${new Date(activity.hoursRange.start).toLocaleTimeString('he-IL', timeOptions)} - ${new Date(activity.hoursRange.end).toLocaleTimeString('he-IL', timeOptions)} אצלנו בסטודיו?`
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
            setIsLoading(true)
            // after getting user first membership we check expiry date 
            const membershipId = user.memberships[0]
            console.log('sanding to getMembership', membershipId);

            const membership: Tmembership = await getMembership(membershipId)
            //if membership expired we give alert box messege and return
            console.log('membership :', membership)
            if (membership?.end) {
                const today = new Date()
                console.log('membership.end < today :', new Date(membership.end) < today)
                if ((new Date(membership.end) < today) || membership.isExpired) {
                    let msg = `היי ${user ? user?.name : ""}  על פי רישומיינו המנוי שברשותך אינו בתוקף  `
                    let btnTxt = 'לרכישת מנוי'
                    getAlertBox(msg, btnTxt)
                    setIsLoading(false)
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
                    await sendEmail(session?.user?.email, session?.user?.name, 'renew')
                }
                if (updatedMembership.isExpired) {
                    console.log(' membership has expired !', updatedMembership)
                    addPractitionerToActivity(membershipId)
                    // fetch to remove membershipId from array and shift it 
                    const userAfterRemovingMembership = await removeUserMembership(user._id)

                    // update client side user to match the user in database so user can not signup to class 
                    console.log('user After Removing Membership', userAfterRemovingMembership);
                    updateClientSideUser(userAfterRemovingMembership)
                    return

                }
                console.log('updatedMembership', updatedMembership);

                addPractitionerToActivity(membershipId)
            }
        }

    }

    const navigatTo = (route: string) => {
        router.replace(route)
    }


    const addPractitionerToActivity = async (membershipId: string) => {
        const id = makeId(8)
        const activityId = activity.id
        const email = session?.user?.email
        const name = session?.user?.name
        const res = await pushPractitionerToActivity(id, periodicAgendaId,
            activityId,
            membershipId,
            email,
            name)
        if (res) {
            let txt = `הרשמתך לשיעור ${activity.name} עברה בהצלחה נתראה על המזרן 🙏 `
            getUserMsg(txt, true)
            updateClientSideActivities(membershipId)
            setIsLoading(false)
        } else {
            let txt = `הייתה בעייה ברישום לשיעור, נסו מאוחר יותר`
            getUserMsg(txt, true)

        }
    }
    const askUserIfToRemoveHimFromActivity = (membershipId: string) => {
        console.log('ask User If To Remove Him From Activity',);
        console.log('membershipId', membershipId);
        setCurrMembershipId(membershipId)
        let nameOfUser = session.user.name
        let msg = `היי ${nameOfUser ? nameOfUser : ""} האם ברצונך לבטל את הגעתך לשיעור ${activity.name} ?`
        let btnTxt = 'כן בטוח ברצוני לבטל'
        getAlertBox(msg, btnTxt)
    }

    const removePractitionerFromActivity = async (membershipId: string) => {

        const wasRemoved = await removePractitionerFromActivityFromDatabase(periodicAgendaId, activity.id, session.user.email)
        if (wasRemoved) {
            removePractitionerFromClientSideActivities(session.user.email)
            let txt = `הוסרת משיעור ${activity.name} בהצלחה`
            getUserMsg(txt, true)

        } else {
            let txt = `הייתה בעייה לבטל שיעור, נסו מאוחר יותר`
            getUserMsg(txt, false)

        }
        const wasRefunded = await refundPractitionerMembershipAtDatabase(membershipId)
        if (wasRefunded) {
            console.log('practitioner after refund', wasRefunded);
        }
        const user: Tuser = await getFullUserByEmail(session?.user?.email)
        // here we check if after refund user stil have memebershipId under user.memberships?
        const doUserOwnMembership = user.memberships.some(membership => membership === membershipId)
        //if yes do nothing if no add it back to user.memberships[]
        console.log('do User Own Membership', doUserOwnMembership);
        if (!doUserOwnMembership) {
            const wasMembershipJustPurchesed = false
            const [isSucsses, updatedUser] = await updateUserWithNewMembershipAtDatabase(membershipId, user._id, wasMembershipJustPurchesed)
            if (isSucsses) console.log('user.memberships was updated with the refunded membership?', updatedUser);

        }

    }

    let alertBoxProps = {
        isAlertBoxShown, setIsAlertBoxShown,
        userMsg, setUserMsg,
        btnTxt, setBtnTxt,
        navigatTo,
        handelChargeUser,
        currMembershipId,
        userId: currUser === null ? "" : currUser._id,
        removePractitionerFromActivity,
    }

    const updateClientSideActivities = (membershipId: string) => {
        const activityToUpdate = activities.find(act => act.id === activity.id)
        let practitioner: Tpractitioner = { membershipId, email: session?.user?.email, name: session?.user?.name }
        activityToUpdate.practitioners.push(practitioner)
        const index = activities.findIndex(act => act.id === activity.id)
        activities[index] = { ...activityToUpdate }
        const updatedActivities = [...activities]
        setActivities(updatedActivities)
    }
    const removePractitionerFromClientSideActivities = (email: string) => {
        const activityToUpdate = activities.find(act => act.id === activity.id)
        const activityIndex = activities.findIndex(act => act.id === activity.id)
        const index = activityToUpdate.practitioners.findIndex(practitioner => practitioner.email === email)
        activityToUpdate.practitioners.splice(index, 1)
        activities[activityIndex] = { ...activityToUpdate }
        const updatedActivities = [...activities]
        setActivities(updatedActivities)
    }
    const updateClientSideUser = (updatedUser: Tuser) => {
        setCurrUser({ ...updatedUser })
    }
    const LessonInfoHoursRangeProps = {
        isCanceled: activity.isCanceled,
        start: activity.hoursRange.start,
        end: activity.hoursRange.end
    }

    const isActivityPassed = () => {
        let now = new Date()
        let activityDate = new Date(activity.date)
        const isDayPassed = activityDate < now
        const isSameDay = isBothTheSameDate(activityDate, now)
        if (isDayPassed) {
            setIsActivityHasPassed(isDayPassed)
        }
        if (isSameDay) {
            console.log('isSameDay in side :  :', isSameDay);
            let activityTime = new Date(activity.hoursRange.start)
            let hours = activityTime.toLocaleTimeString('he-IL').split(':')[0]
            let minutes = activityTime.toLocaleTimeString('he-IL').split(':')[1]
            activityDate.setHours(+hours, +minutes, 0, 0);
            const isTimePassed = activityDate < now
            setIsActivityHasPassed(isTimePassed)
        }
    }
    const checkActivityTime = () => {
        let currentTime: Date = new Date();
        let activityStart: Date = new Date(activity.date)
        let activityTime = new Date(activity.hoursRange.start)
        let hours = activityTime.toLocaleTimeString('he-IL').split(':')[0]
        let minutes = activityTime.toLocaleTimeString('he-IL').split(':')[1]
        activityStart.setHours(+hours, +minutes, 0, 0);
        console.log('activityStart : ', activityStart)

        // Define 9:00 and 17:00 as reference times
        const nineAM = new Date(activityStart);
        nineAM.setHours(9, 0, 0, 0);

        const fivePM = new Date(activityStart);
        fivePM.setHours(17, 0, 0, 0);

        // Condition 1: Early activity, starting at or before 9:00
        if (activityStart <= nineAM) {
            const twentyTwoDayBefore = new Date(activityStart);
            twentyTwoDayBefore.setDate(twentyTwoDayBefore.getDate() - 1); // Set to the previous day
            twentyTwoDayBefore.setHours(22, 0, 0, 0);

            // If current time is after 22:00 on the day before, return false
            if (currentTime >= twentyTwoDayBefore) {
                return false;
            }
        }

        // Condition 2: Late activity, starting at or after 17:00
        if (activityStart >= fivePM) {
            const timeDifference = Math.abs((+currentTime) - (+activityStart)) / (1000 * 60 * 60);

            // If the time difference is less than 2 hours, return false
            if (timeDifference < 2) {
                return false;
            }
        }

        // If neither condition returns false, return true
        return true;
    }

    const handelWorkshop = (activity: Tactivity) => {
        router.replace(`/workshops/${activity.workshopId}`)
    }
    const PractitionersIndexProps = {
        practitioners: activity?.practitioners,
        askUserIfToRemoveHimFromActivity,
        checkActivityTime,
        isWorkshop: activity.classOrWorkshop === 'סדנא' ? true : false
    }
    return (
        <article className='activity-card-container grid clean'
            style={activity.classOrWorkshop === 'סדנא' ? { border: '1px solid var(--clr10)' } : {}}>
       
                <LessonInfoHoursRange {...LessonInfoHoursRangeProps} />
             
                {activity.isCanceled && <span > השיעור בוטל</span>}

                <section className='activity-info-container'>

                    <div className='activity-info grid' style={activity.isCanceled ? { textDecoration: ' line-through' } : {}} >
                        <Image className='activity-teacher-img gc1'
                            alt={'teacher-img'} width={50} height={50} src={'/hero.jpg'} />
                        <div className=' flex-col gc2'>
                            <span className='activity-name gc2'>   {<span>    {activity.classOrWorkshop} </span>} {activity.name} </span>
                            <span className='activity-teacher-name gc2'>עם {activity.teacher} </span>
                            <span className='activity-location gc2'> בית פעם - סטודיו קדם  </span>

                        </div>
                        <div className='check-in-container gc3 flex-ac'>
                            {!isOnWeeklyScheduleMode ? <button style={activity.isCanceled ? { backgroundColor: 'green' } : { backgroundColor: '#cf00009e' }}
                                type='button' className='check-in-button '
                                onClick={() => handelClick()}>{activity.isCanceled ? 'שחזר ' : 'בטל '}
                            </button> :

                                <div className='flex-col'>

                                    <button disabled={isActivityHasPassed || activity.isCanceled} type='button' className='btn flex-jc-ac'
                                        style={isActivityHasPassed || activity.isCanceled ? { color: `var(--clr3)` } : {}}
                                        onClick={activity.classOrWorkshop === 'סדנא' ? () => handelWorkshop(activity) : () => handelSignInToClass()}>
                                        {isLoading ? <Spinner /> : activity.classOrWorkshop === 'סדנא' ? 'לפרטים' : ` הרשמה`}
                                    </button>
                                    <small className='activity-has-passed'>{isActivityHasPassed && 'חלון הזמנת שיעור עבר'}</small>
                                </div>

                            }
                        </div>
                    </div>

                </section>

            {

                activity?.practitioners?.length > 0 &&
                <PractitionersIndex {...PractitionersIndexProps} />

            }
            <AlertBox {...alertBoxProps} />

        </article>
    )
}