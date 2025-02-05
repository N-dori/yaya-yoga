'use client'
import { Tworkshop } from '@/app/types/types'
import {  getFormattedDate, getFormattedTime, makeId,  scrollUp } from '@/app/utils/util'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import EditWorkshopBtns from './EditWorkshopBtns'
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import Spinner from '../Spinner'
import ParagraphsIndex from '../ParagraphsIndex'
import { AlertBox } from '../AlertBox'
import LocationSvg from '@/app/assets/svgs/LocationSvg'
import DynamicImage from '../DynamicImage'
import { deleteWorkshop, updateWorkshop,updateUserWithNewWorkshopAtDatabase } from '@/app/actions/workshopActions'
import { deleteAnnouncement } from '@/app/actions/billboardActions'
import { deleteActivity, pushPractitionerToActivity } from '@/app/actions/periodicAgendaActions'
import { createNewMembership, getPlan } from '@/app/actions/membershipActions'

type WorkshopsPreviewProps = {
  isDetailsMode: boolean
  workshop: Tworkshop
  numberOfMeetings: number
  workshops: Tworkshop[]
}


export default function WorkshopsPreview({ workshop, isDetailsMode, numberOfMeetings, workshops }: WorkshopsPreviewProps) {

  const [isEditMode, setIsEditMode] = useState(false)
  const [isOnDetailsPage, setIsOnDetailsPage] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [currWorkshop, setCurrWorkshop] = useState<Tworkshop>(null)
  const [isLoading, setIsLoading] = useState<boolean>()

  const [currWorkshops, setCurrWorkshops] = useState<Tworkshop[]>([])

  const [isAlertBoxShown, setIsAlertBoxShown] = useState(false)
  const [userMsg, setUserMsg] = useState('')
  const [btnTxt, setBtnTxt] = useState('')

  const { data: session } = useSession()
  const path = usePathname()
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    setCurrWorkshop(workshop)
    setCurrWorkshops(workshops)
    setAdmin()
    // to make sure we in details page= [id]-so that  edit btn will not show up on the <workshopList/>    
    path[path.length - 1] !== 's' ? setIsOnDetailsPage(true) : ''

  }, [session?.user?.email, path,])

  const setAdmin = () => {
    setIsAdmin(session?.user?.email ==='yshwartz@gmail.com'||session?.user?.email==='dori.nadav@gmail.com')
   } 
  const navigatTo = (route: string) => {
    router.push(route)
  }

  const handelChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'edit-desc') {
      setCurrWorkshop((prevCurrWorkshop) => ({
        ...prevCurrWorkshop,
        desc: value,
      }));
    }
  }

  const handelChangeWorkshop = (workshopId: string) => {
    const workshop = workshops.find(currWorkshop => currWorkshop._id === workshopId)
    setCurrWorkshop({ ...workshop })
  }

  const onRemoveWorkshop = async () => {
    try {
      const isOk = confirm('בטוח שברצונך למחוק סדנא?')
      if (isOk) {
        const isConfirmed = confirm('האם ברצונך להסיר גם את המודעה בלוח המודעות הקשורה בסדנא?')
        if (isConfirmed) {
          const announcement = await deleteAnnouncement(workshop.id)
          console.log('announcement', announcement);

        }
        if (numberOfMeetings > 1) {
          const doUserWantToRemoveAllMeetingOfWorkshop = confirm(`לסדנר ${workshop.title} יש יותר ממפגש אחד! ברצונך להסיר את כל מפגשים?`)
          if (doUserWantToRemoveAllMeetingOfWorkshop) {
            const deleteWorkshopPromises = workshops.map(workshop => {
              deleteWorkshop(workshop._id)
            })
            const deleteActivityPromises = workshops.map(workshop => {
              deleteActivity(workshop.activityId)
            })

            const deleteWorkshopResult = Promise.all(deleteWorkshopPromises)
            const deleteActivityResult = Promise.all(deleteActivityPromises)
            if (deleteActivityResult && deleteWorkshopResult) {
              let txt = 'סדנאות הוסרו בהצלחה'
              getUserMsg(txt, true)
            }
          }
        } else {
          const res = await deleteWorkshop(workshop._id)
          const deleteRes = await deleteActivity(workshop.activityId)
          if (res && deleteRes) {
            let txt = 'סדנא הוסרה בהצלחה'
            getUserMsg(txt, true)
          }
        }
        router.push('/')
      }
    } catch (error) {
      console.log('had a problem to delete workshop', error);
    }
  }

  const updateClientSideWorkshops = (workshopId: string) => {
    const index = currWorkshops.findIndex(workshop => workshop._id === workshopId)
    currWorkshops.splice(index, 1, currWorkshop)
    setCurrWorkshops([...currWorkshops])

  }

  const onSaveChanges = async () => {
    setIsLoading(true)
    let workshopId = currWorkshop._id
    console.log('workshopID is :', workshopId);

    const res = await updateWorkshop(workshopId, currWorkshop)
    updateClientSideWorkshops(workshopId)
    if (res) {
      let txt = `סדנא עודכנה בהצלחה`
      getUserMsg(txt, true)
      setIsEditMode(false)
      setIsLoading(false)
    } else {
      let txt = `הייתה בעיה לעדכן סדנא נסה מאוחר יותר`
      getUserMsg(txt, false)
      setIsLoading(false)
    }
  }

  const onRegisterToWorkshop = async () => {
    //ask user if to continue to payment
    const email = session?.user?.email
    const name = session?.user?.name
    const workshopTitle = workshop.title
    if (!email) {
      let userMsg = 'להשלמת התהליך יש צורך לבצע התחברות  '
      let btnTxt = 'קח אותי'
      getAlertBox(userMsg, btnTxt)
      return
    }
    let userMsg = `היי ${name} שמחים על התעניינותך בסדנא ${workshopTitle} האם ברצונך להתקדם לתשלום?`
    let btnTxt = 'לתשלום לסדנא'
    getAlertBox(userMsg, btnTxt)

  }

  const onBookingWorkshop = async ()=>{
    const email = session?.user?.email
    const name = session?.user?.name
    const id = makeId(8)
    const paid = +workshop.price
    const workshopTitle = workshop.title
    const expiryDate = workshop.date
    
        const [membership, userId] = await getPlan('סדנא', email, paid, workshopTitle, expiryDate)
    if (!membership || !userId) {
      return
    }

    const membershipId: string = await createNewMembership(membership)

    if (membershipId) {
      //updating the user memberships array - pushing membership _id 
      const periodicAgendaId = null
      const activityId = workshop.activityId

      const res = await pushPractitionerToActivity(id, periodicAgendaId,
        activityId,
        membershipId,
        email,
        name)
      if (res) {
        const updatedUser = await updateUserWithNewWorkshopAtDatabase(membershipId, userId)
        if (updatedUser) {
          let txt = '🙏 תודה על רכישתך'
          getUserMsg(txt, true)
        }
      }

    } else {

      let txt = 'הייתה בעיה נסו שוב מאוחר יותר'
      console.log(txt);
      getUserMsg(txt, false)

    }
  }

  const getUserMsg = (txt: string, isSuccess: boolean) => {
    dispatch(callUserMsg({ msg: txt, isSuccess }))
    scrollUp()
    setTimeout(() => {
      dispatch(hideUserMsg())
    }, 3500);
  }

  const getAlertBox = (userMsg: string, btnTxt: string,) => {
    setUserMsg(userMsg)
    setBtnTxt(btnTxt)
    setIsAlertBoxShown(true)

  }

  const EditWorkshopBtnsProps = {
    isAdmin, isOnDetailsPage,
    isEditMode, setIsEditMode,
    isLoading, onSaveChanges,
    onRemoveWorkshop
  }

  const AlertBoxProps = {
    isAlertBoxShown, setIsAlertBoxShown,
    userMsg, setUserMsg,
    btnTxt, setBtnTxt,
    navigatTo,
    onBookingWorkshop,
  }

  const goToDetailsPage = () => {
    if (!isOnDetailsPage) {
      router.push(`workshops/${currWorkshop.id}`)
    }
  }

  return (
    currWorkshop &&

    <section className='workshop-card-wrapper' >


      <article className='workshop-card-container flex-col gap05 clean ' >

        <h2 className='workshop-title mb-1 tac'>{currWorkshop.title}</h2>
        <h4 className='sub-title'>{currWorkshop.subTitle}</h4>

        <section>

          {(isDetailsMode && workshops?.length > 1) &&
            <section className='additional-workshops-dates bold flex-col gap05'>
              {numberOfMeetings > 1 &&
                <p className=' mb-1'>
                  לסדנא {numberOfMeetings} חלקים, לצפייה בתאריכים נוספים:
                </p>
              }

              {

                workshops?.map(workshop =>
                  <span key={workshop.id} className='additional-workshop-date no-under-line pointer'
                    onClick={() => handelChangeWorkshop(workshop._id)}> {getFormattedDate(workshop.date) + ' - '}
                    <span className='underline' >{workshop.subTitle}</span>
                  </span>

                )
              }
            </section>
          }
          <section className='img-container' onClick={goToDetailsPage}>
            {isDetailsMode &&
              <div className='date-hours flex-sb w100'>
                <p className='date bold'>{getFormattedDate(currWorkshop.date)}</p>
                <p className='hours bold'>{getFormattedTime(currWorkshop.activityStartTime)} - {getFormattedTime(currWorkshop.activityEndTime)}</p>
              </div>}
            {!isDetailsMode && <div className='signup-to-workshop-btn'>לפרטים נוספים</div>}
            <DynamicImage url={currWorkshop.imgUrl} alt={'imageOfworkshop'} imgClassName='work-shop-image pointer' />
          </section>

        </section>
        {
          (isOnDetailsPage) &&
          <section className='flex-ac'>
            <EditWorkshopBtns {...EditWorkshopBtnsProps} />

          </section>

        }
        <p className='price bold'>מחיר: {currWorkshop.price} ש"ח</p>
        <p className='location bold'><LocationSvg />{currWorkshop.activityLocation} </p>
        <span className='last-date tac'> תאריך אחרון להרשמה <span className='bold'> {getFormattedDate(currWorkshop.lastDateForRegistration)}</span></span>


        {!isEditMode ? <section className='pb-1'>
          <ParagraphsIndex desc={currWorkshop.desc} isDetailsMode={isDetailsMode} />

        </section>
          :
          <section className='edit-desc-wrapper flex-jc-ac w-100'>
            <textarea className="edit-desc" name="edit-desc" id="" value={currWorkshop.desc}
              onChange={(e) => handelChange(e)}></textarea>

          </section>
        }
        {(!isEditMode && isDetailsMode) &&
          <button type='button' className='btn flex-jc-ac'>{
            isLoading ? 
            <Spinner /> : 
            <span onClick={onRegisterToWorkshop}>לרכישה והרשמה</span>}</button>}
      </article>


      <AlertBox {...AlertBoxProps} />

    </section>
  )
}