'use client'
import BackSvg from '@/app/assets/svgs/BackSvg'
import { TperiodicAgenda, TuserMsgProps } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import DaysOfActivities from './DaysOfActivities'
import { LesssonsInfoList } from './LesssonsInfoList'
import DatePicker from 'react-datepicker'
import { he } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css'
import { getUrl } from '@/app/util'
import { useRouter } from 'next/navigation'


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

  const [currDate, setCurrDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined | null>(undefined)
  const [isOnSearchMode, setIsOnSearchMode] = useState<boolean>(false)
  const [isOnCancelMode, setIsOnCancelMode] = useState<boolean>(false)
  const router = useRouter()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);
  useEffect(() => {

  }, [isOnSearchMode])
  const hadelExistSearchMode = () => {
    setSelectedDate(null)
    setCurrDate(new Date())
    setIsOnSearchMode(!isOnSearchMode)
  }

  const handelDateChange = (date: Date | undefined | null) => {
    console.log(date, 'date');

    if (date === null) {
      setSelectedDate(new Date())
      setCurrDate(new Date())
      setIsOnSearchMode(!isOnSearchMode)
      return
    }

    setSelectedDate(date)
    setCurrDate(date as Date)

    setIsOnSearchMode(true)
  }

  const handelLessonCancelation = (activityId: string, currCencelationState: boolean, lastDate: Date | null | undefined) => {
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
            if (lastDate) setCurrDate(new Date(lastDate))
          }
        }
      }
    } else {
      console.log('handel cancelation with mongo ');
      updatePeriocidAgendaAtDataBase(activityId, currCencelationState, lastDate)


    }
  }
  const updatePeriocidAgendaAtDataBase = async (activityId: string, currCencelationState: boolean, lastDate: Date | null | undefined) => {
    try {
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
        setTimeout(() => {
          // router.replace('/dashboard')
        }, 1000);
        if (setCurrPeriodicAgenda) {
          setCurrPeriodicAgenda({ ...updatedPeriodicAgenda })
          if (lastDate) setCurrDate(new Date(lastDate))
          setTimeout(() => {
            if (setIsOnCancelMode) setIsOnCancelMode(!isOnCancelMode)
          }, 2500);
        }
      } else {
        throw new Error('faild to update periodic Agenda')
      }

    } catch (err) {
      console.log(err);

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
      <div>
        <DatePicker
          selected={selectedDate}
          onChange={(currDate: Date | null) => handelDateChange(currDate)}
          dateFormat={'dd/MM/yyyy'}
          minDate={periodicAgenda ? periodicAgenda.date ? new Date(periodicAgenda?.date?.start) : undefined : undefined}
          maxDate={periodicAgenda ? periodicAgenda.date ? new Date(periodicAgenda?.date?.end) : undefined : undefined}
          placeholderText="חפש פעילות לפי תאריך"
          // showIcon
          locale={he}

        />

      </div>
      <DaysOfActivities {...DaysOfActivitiesProps} />
      <LesssonsInfoList {...LesssonsListProps} />
    </main>
  )
}