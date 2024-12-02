'use client'
import BackSvg from '@/app/assets/svgs/BackSvg'
import { Tmembership, TperiodicAgenda, Tuser, TuserMsgProps } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivities from './DaysOfActivities'
import { LesssonsInfoList } from './LesssonsInfoList'
import DatePicker from 'react-datepicker'
import { he } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css'
import { clearPractitionersFromActivityAtDataBase, getFullUserByEmail, getUrl, getUser, refundPractitionerMembershipAtDatabase, updateUserWithNewMembershipAtDatabase } from '@/app/utils/util'
import { useRouter } from 'next/navigation'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import { useDispatch } from 'react-redux'


type PreviewDisplayProps = {
  periodicAgenda: TperiodicAgenda | undefined
  setPeriodicAgenda?: (p: TperiodicAgenda) => void,
  startPeriodicAgendaDate?: Date | null | undefined,
  endPeriodicAgendaDate?: Date | null | undefined,
  isWorkInProgress: boolean,
  isPreviewDisplayShown?: boolean
  setIsPreviewDisplayShown?: (b: boolean) => void
  getUserMsg?: (userMsg: { msg: string, isSucsses: boolean }) => void
  setCurrPeriodicAgenda?: (periodicAgenda: TperiodicAgenda) => void

}

export default function PeriodicAgendaPreviewDisplay({ setCurrPeriodicAgenda, getUserMsg, isPreviewDisplayShown, setPeriodicAgenda, isWorkInProgress, setIsPreviewDisplayShown,
  periodicAgenda }: PreviewDisplayProps) {

  const [currDate, setCurrDate] = useState<Date>(new Date(periodicAgenda?.date?.start))
  const [startDate] = useState<Date>(new Date(periodicAgenda?.date?.start))
  const [endDate] = useState<Date>(new Date(periodicAgenda?.date?.end))
  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(undefined)
  const [isOnSearchMode, setIsOnSearchMode] = useState<boolean>(false)
  const [isOnCancelMode, setIsOnCancelMode] = useState<boolean>(false)

  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

  }, []);

  const hadelExistSearchMode = () => {
    setSelectedDate(null)
    setCurrDate(new Date())
    setIsOnSearchMode(!isOnSearchMode)
  }

  const handelDateChange = (newDate: Date | undefined | null) => {

    if (newDate === null) {
      setIsOnSearchMode(!isOnSearchMode)
      setSelectedDate(startDate)
      setCurrDate(startDate)

      return
    }

    setCurrDate(newDate);
    setSelectedDate(newDate)

  }

  const handelLessonCancelation = (activityId: string, currCencelationState: boolean, lastDate: Date | null | undefined) => {
    //isWorkInProgress = context is we in the middle of creating periodicAgenga or on edit mode. 
    if (isWorkInProgress) {
      if (periodicAgenda) {
        if (periodicAgenda.activities) {
          const activityIndex = periodicAgenda.activities.findIndex(activity => activity.id === activityId);

          if (activityIndex !== -1) {
            // Create a new array with the updated activity
            const updatedActivities = [...periodicAgenda.activities];
            const updatedActivity = { ...updatedActivities[activityIndex], isCanceled: currCencelationState ? false : true };
            updatedActivities[activityIndex] = updatedActivity;

            // Create a new periodicAgenda object with the updated activities
            const updatedPeriodicAgenda: TperiodicAgenda = {
              ...periodicAgenda,
              activities: updatedActivities
            };

            // Set the new state
            if (setPeriodicAgenda) setPeriodicAgenda(updatedPeriodicAgenda);
            getUserMsg({ isSucsses: true, msg: currCencelationState ? 'שיעור שוחזר בהצלחה' : 'שיעור בוטל בהצלחה' })
            setTimeout(() => {
              setCurrDate(new Date(lastDate))
            }, 0.05)
          }
        }
      }
    } else {
      console.log('handel cancelation with mongo ');
      updatePeriocidAgendaAtDataBaseAndClientSide(activityId, currCencelationState, lastDate)
    }
  }

  const updatePeriocidAgendaAtDataBaseAndClientSide = async (activityId: string, currCencelationState: boolean, lastDate: Date | null | undefined) => {
    try {
      const activity = periodicAgenda.activities.find(activity => activity.id === activityId)
      const isConfirm = confirm(`האם אתה בטוח שברצונך לבטל שיעור ${activity.name} שחל בתאריך ${new Date(activity.date).toLocaleDateString('he-IL')}? במידה וישנם מתרגלים רשומים המערכת תזכה את המנוי שלהם בהתאם ותסיר אותם מהשיעור!`)
      if (!isConfirm) return

      const isPractiotionnersFound = activity?.practitioners?.length? true : false
      if(isPractiotionnersFound){
        const promises = activity?.practitioners.map(practitioner=> 
          refundPractitionerMembership(practitioner.membershipId, practitioner.email)
        )
        await Promise.all(promises)
        await clearPractitionersFromActivityAtDataBase(activityId,periodicAgenda._id)
      }


      setIsOnCancelMode(!isOnCancelMode)
      const url = getUrl('periodicAgenda/updatePeriodicAgendaAfterCanceling')
      const res = await fetch(url, {
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ periodicAgendaId: periodicAgenda?._id, activityId, currCencelationState })
      })
      if (res.ok) {
        const updatedPeriodicAgenda = await res.json()
        // callUserMsg({ sucsses: true, msg: 'לוח זמנים פורסם בהצלחה' })

        if (setCurrPeriodicAgenda) {
          setCurrPeriodicAgenda({ ...updatedPeriodicAgenda })
          setTimeout(() => {
            if (lastDate) setCurrDate(new Date(lastDate))
          }, 1000)
          setTimeout(() => {
            if (setIsOnCancelMode) setIsOnCancelMode(!isOnCancelMode)

            dispatch(callUserMsg({ isSucsses: true, msg: currCencelationState ? 'שיעור שוחזר בהצלחה' : 'שיעור בוטל בהצלחה' }))
            setTimeout(() => {
              dispatch(hideUserMsg())
            }, 3500);
          }, 1005)
        }
      } else {
        throw new Error('faild to update periodic Agenda')
      }

    } catch (err) {
      console.log(err);
    }
  }
  const refundPractitionerMembership = async (membershipId: string,userEmail:string) => {
    
    const wasRefunded = await refundPractitionerMembershipAtDatabase(membershipId)
    if (wasRefunded) {
        console.log('practitioner after refund', wasRefunded);
    }
    const user: Tuser = await getFullUserByEmail(userEmail)
    // here we check if after refund user stil have memebershipId under user.memberships?
    const doUserOwnMembership = user.memberships.some(membership => membership === membershipId)
    //if yes do nothing if no add it back to user.memberships[]
    console.log('do User Own Membership', doUserOwnMembership);
    if (!doUserOwnMembership) {
        const wasMembershipJustPurchesed= false
        const [isSucsses,updatedUser] = await updateUserWithNewMembershipAtDatabase(membershipId, user._id, wasMembershipJustPurchesed)
        if (isSucsses) console.log('user.memberships was updated whith the refunded membership?', updatedUser);

    }

}
  const DaysOfActivitiesProps = {
    activities: periodicAgenda?.activities,
    setCurrDate,
    currDate,
    isOnSearchMode,
    setIsOnSearchMode,
    isOnCancelMode,
    setIsOnCancelMode,
  }

  const LesssonsListProps = {
    activities: periodicAgenda?.activities,
    currDate,
    isOnSearchMode,
    hadelExistSearchMode,
    isWorkInProgress,
    handelLessonCancelation,


  }
  const returnToDashboard = () => {
    router.replace('/')
    router.replace('/dashboard')
  }
  return (
    <main className='preview-display-container '>
      {setIsPreviewDisplayShown && <BackSvg setIsPreviewDisplayShown={() => setIsPreviewDisplayShown(false)} />}
      {!isWorkInProgress && <BackSvg returnToDashboard={returnToDashboard} />}
      {<h1 className='schedule-headline tac'>לוח זמנים</h1>}
      <h4 className='studio-name mb-05'>בית פעם- סטודיו קדם</h4>
      <h6 className='studio-address mb-05'>רחוב הדקלים 92, פרדס חנה-כרכור</h6>
      <h6 className='studio-phone mb-1'>052-437-7820</h6>
      <div onClick={() => setIsOnSearchMode(true)}>
        <DatePicker

          selected={selectedDate}
          onChange={(currDate: Date | null) => handelDateChange(currDate)}
          dateFormat={'dd/MM/yyyy'}
          minDate={startDate ? startDate : undefined}
          maxDate={endDate ? endDate : undefined}
          placeholderText="חפש פעילות לפי תאריך"
          showIcon
          locale={he}

        />

      </div>
      <DaysOfActivities {...DaysOfActivitiesProps} />
      <LesssonsInfoList {...LesssonsListProps} />
    </main>
  )
}