'use client'
import BackSvg from '@/app/assets/svgs/BackSvg'
import { Tactivity, TperiodicAgenda, Tuser } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivities from './DaysOfActivitiesIndex'
import { LessonsInfoList } from './LessonsInfoList'
import DatePicker from 'react-datepicker'
import { he } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css'
import { getFullUserByEmail } from '@/app/utils/util'
import { useRouter } from 'next/navigation'
import { updateUserWithNewMembershipAtDatabase } from '@/app/actions/userActions'
import { refundPractitionerMembershipAtDatabase } from '@/app/actions/membershipActions'
import { clearPractitionersFromActivityAtDataBase, updatePeriodicAgendaAfterCancelling } from '@/app/actions/periodicAgendaActions'


type PreviewDisplayProps = {
  periodicAgenda: TperiodicAgenda | undefined
  setPeriodicAgenda?: (p: TperiodicAgenda) => void,
  startPeriodicAgendaDate?: Date | null | undefined,
  endPeriodicAgendaDate?: Date | null | undefined,
  isWorkInProgress: boolean,
  isEditCurrPeriodicAgenda: boolean,
  isPreviewDisplayShown?: boolean
  setIsPreviewDisplayShown?: (b: boolean) => void
  getUserMsg?: (userMsg: { msg: string, isSuccess: boolean }) => void
  setCurrPeriodicAgenda?: (periodicAgenda: TperiodicAgenda) => void

}

export default function PeriodicAgendaPreviewDisplay({ setCurrPeriodicAgenda, getUserMsg, isEditCurrPeriodicAgenda,
  setPeriodicAgenda, isWorkInProgress, setIsPreviewDisplayShown,
  periodicAgenda }: PreviewDisplayProps) {

  const [currDate, setCurrDate] = useState<Date>(new Date(periodicAgenda?.date?.start))
  const [startDate] = useState<Date>(new Date(periodicAgenda?.date?.start))
  const [endDate] = useState<Date>(new Date(periodicAgenda?.date?.end))
  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(undefined)
  const [isOnSearchMode, setIsOnSearchMode] = useState<boolean>(false)
  const [isOnCancelMode, setIsOnCancelMode] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

  }, []);

  const handelExistSearchMode = () => {
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

  const handelLessonCancellation = (activityId: string, currCancellationState: boolean, lastDate: Date | null | undefined) => {
    updatePeriodicAgendaAtDataBaseAndClientSide(activityId, currCancellationState, lastDate)
  }

  const removeAndRefundPractitioners = async (activity: Tactivity, activityId: string) => {
    const isPractitionersFound = activity?.practitioners?.length ? true : false
    if (isPractitionersFound) {
      const promises = activity?.practitioners.map(practitioner =>
        refundPractitionerMembership(practitioner.membershipId, practitioner.email)
      )
      await Promise.all(promises)
      await clearPractitionersFromActivityAtDataBase(activityId, periodicAgenda._id)
    }
  }

  const updatePeriodicAgendaAtDataBaseAndClientSide = async (activityId: string, currCancellationState: boolean, lastDate: Date | null | undefined) => {
    try {
      const activity = periodicAgenda.activities.find(activity => activity.id === activityId)
      const cancelTxt = `האם אתה בטוח שברצונך לבטל שיעור ${activity.name} שחל בתאריך ${new Date(activity.date).toLocaleDateString('he-IL')}? במידה וישנם מתרגלים רשומים המערכת תזכה את המנוי שלהם בהתאם ותסיר אותם מהשיעור!`
      const restoreTxt = `האם אתה בטוח שברצונך לשחזר שיעור ${activity.name} שחל בתאריך ${new Date(activity.date).toLocaleDateString('he-IL')}`
      const isConfirm = confirm(currCancellationState ? restoreTxt : cancelTxt)
      if (!isConfirm) return
      await removeAndRefundPractitioners(activity, activityId)

      const updatedPeriodicAgenda = await updatePeriodicAgendaAfterCancelling(periodicAgenda?._id, activityId, currCancellationState)

      if (updatedPeriodicAgenda) {
        setPeriodicAgenda(updatedPeriodicAgenda);
        getUserMsg({ isSuccess: true, msg: currCancellationState ? 'שיעור שוחזר בהצלחה' : 'שיעור בוטל בהצלחה' })
        setTimeout(() => {
          setCurrDate(new Date(lastDate))
        }, 0.05)
      } else {
        throw new Error('failed to update periodic Agenda')
      }

    } catch (err) {
      console.log(err);
    }
  }
  const refundPractitionerMembership = async (membershipId: string, userEmail: string) => {

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
      const wasMembershipJustPurchesed = false
      const [isSucsses, updatedUser] = await updateUserWithNewMembershipAtDatabase(membershipId, user._id, wasMembershipJustPurchesed)
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

  const LessonsListProps = {
    activities: periodicAgenda?.activities,
    currDate,
    isOnSearchMode,
    handelExistSearchMode,
    isWorkInProgress,
    handelLessonCancellation,


  }
  const returnToDashboard = () => {
    router.replace('/')
    router.push('/dashboard')
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
      <LessonsInfoList {...LessonsListProps} />
    </main>
  )
}