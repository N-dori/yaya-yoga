'use client'
import { Tmembership, Tworkshop } from '@/app/types/types'
import { createNewMembership, deleteAnnouncemnt, deleteWorkshop,  getDateType,  getFormatedDate, getFormatedTime, getPlan, makeId, pushPractionerToActivity, scrollUp, updateUserWithNewMembershipAtDatabase, updateWorkshop } from '@/app/utils/util'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import EditWorkshopBtns from './EditWorkshopBtns'
import { usePathname } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { callUserMsg, hideUserMsg } from '@/app/store/features/msgSlice'
import Spinner from '../Spinner'

type WorkshopsPreviewProps = {
  isDetailsMode: boolean
  workshop: Tworkshop
  numberOfMeetings:number
  workshops:Tworkshop[]
}


export default function WorkshopsPreview({ workshop, isDetailsMode,numberOfMeetings,workshops }: WorkshopsPreviewProps) {

  const [isEditMode, setIsEditMode] = useState(false)
  const [isOnDetailsPage, setIsOnDetailsPage] = useState(false)
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [currWorkshop, setCurrWorkshop] = useState<Tworkshop>(null)
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isAditionalDates, setIsAditionalDates] = useState<boolean>(false)
  const [paragraphs, setParagraphs] = useState<string[]>([])

  const { data: session } = useSession()
  const path = usePathname()
  const dispatch = useDispatch()

  useEffect(() => {
    setCurrWorkshop(workshop)
    setIsAdmin(session?.user?.email === 'yshwartz@gmail.com' ||
      session?.user?.email === 'dori.nadav@gmail.com')
    // to make sure we in details page= [id]-so that  edit btn will not show up on the <workshopList/>    
    path[path.length - 1] !== 's'? setIsOnDetailsPage(true):''
  
    }, [session?.user?.email, path,])

  useEffect(() => {
    getParagraphs()
    console.log('workshops',workshops);
    
  }, [currWorkshop?.desc,workshops])

const getParagraphs = ( )=> {
  if(currWorkshop?.desc){
    const paragraphs = currWorkshop?.desc.split('/')
    setParagraphs(paragraphs)
  }
}

  const handelChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    console.log('name', name);
    console.log('e.target.name', e.target.name);

    if (name === 'edit-desc') {
      setCurrWorkshop((prevCurrWorkshop) => ({
        ...prevCurrWorkshop,
        desc: value,
      }));
    }
  }

const handelChangeWorkshop =(workshopId:string) => {
const workshop= workshops.find(currWorkshop=> currWorkshop._id === workshopId)
setCurrWorkshop({...workshop})
}

 const onRemoveWorkshop = async ()=>{
  try {
    const isOk = confirm('בטוח שברצונך למחוק סדנא?')
  if(isOk){
    const isConfirmed = confirm('האם ברצונך להסיר גם את המודעה בלוח המודעות  הקשורה בסדנא?')
  if(isConfirmed){
    const announcement = await deleteAnnouncemnt(workshop.id)
    console.log('announcement',announcement);

  }
if(numberOfMeetings>1){
   const doUserWantToRemoveAllMeetingOfWorkshop=confirm(`לסדנר ${workshop.title} יש יותר ממפגש אחד! ברצונך להסיר את כל מפגשים?`)
if(doUserWantToRemoveAllMeetingOfWorkshop){
    const promises = workshops.map(workshop=>{
      deleteWorkshop(workshop._id)
    })
    const result = Promise.all(promises)
    if(result){
    let txt ='סדנאות הוסרו בהצלחה'
    getUserMsg(txt,true)
    }
 }
} else 
{
  const res = await deleteWorkshop(workshop._id)
  if(res){
    let txt ='סדנא הוסרה בהצלחה'
    getUserMsg(txt,true)
  }
}
   
  }
  } catch (error) {
    console.log('had a problem to delete workshop', error);
  }
 }

  const onSaveChanges = async () => {
    setIsLoading(true)
    let workshopId = currWorkshop._id
    console.log('workshopID is :', workshopId);

    const res = await updateWorkshop(workshopId, currWorkshop)
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

    const email= session?.user?.email 
    const name =session?.user?.name
    const id =makeId(8)
    const paid = +workshop.price

    const [membership, userId] = await getPlan('סדנא',email,paid)
    if (!membership || !userId) {
      return
    } 
    const newMembership:Tmembership = await createNewMembership(membership)
    if (newMembership) {
      const membershipId = newMembership._id
      //updating the user memberships array - pushing membership _id 
         const wasMembershipJustPurchesed = true
      const periodicAgendaId =null
      const activityId = workshop.activityId
      
              const res = await pushPractionerToActivity( id ,periodicAgendaId, 
                                                                    activityId,
                                                                    membershipId,
                                                                    email ,
                                                                    name)
        let txt = '🙏 תודה על רכישתך'
        getUserMsg(txt, true)
      } else {
        let txt = 'הייתה בעיה נסו שוב מאוחר יותר'
        getUserMsg(txt, false)
      
    }
    

  }

  const getUserMsg = (txt: string, isSucsses: boolean) => {
    dispatch(callUserMsg({ msg: txt, isSucsses }))
    scrollUp()
    setTimeout(() => {
      dispatch(hideUserMsg())
    }, 3500);
  }

  const EditWorkshopBtnsProps = {
    isAdmin, isOnDetailsPage,
    isEditMode, setIsEditMode,
    isLoading, onSaveChanges,
    onRemoveWorkshop
  }
  return (
    currWorkshop &&
    <section className='workshop-card-wrapper'>

      <article className='workshop-card-container flex-col gap1 clean ' >

        <h2 className='workshop-title tac'>{currWorkshop.title}</h2>
        <h4 className='sub-title'>{currWorkshop.subTitle}</h4>
        <section>

          {isDetailsMode &&
            <div className='flex-sb'>
              <p className='date bold'>{getFormatedDate(currWorkshop.date)}</p>
              <p className='hours bold'>{getFormatedTime(currWorkshop.activityStartTime)} - {getFormatedTime(currWorkshop.activityEndTime)}</p>
            </div>}
       

          <Image className='work-shop-image' src={currWorkshop.imgUrl} alt={'imageOfworkshop'}
            style={{ width: '100%' }}
            sizes='100vw'
            width={0}
            height={270}
          />
        </section>

        <span className='last-date tac'> תאריך אחרון להרשמה <span className='bold'> {getFormatedDate(currWorkshop.lastDateForRegistration)}</span></span>
        <p className='price bold'>מחיר: {currWorkshop.price} ש"ח</p>
        <p className='location bold'>{currWorkshop.activityLocation} </p>

        <section className='additional-workshps-dates bold flex-col gap05'>
              { numberOfMeetings>1&&<p className='pointer' 
               onClick={()=>setIsAditionalDates(true)}>לסדנא {numberOfMeetings} חלקים לצפייה בתאריכים נוספים</p>
               }
              {isAditionalDates&&
              workshops?.map(workshop=>
                <p className='underline pointer' onClick={()=>handelChangeWorkshop(workshop._id)}>{getFormatedDate(workshop.date)}</p>
              )
              }
            </section>

        {!isEditMode ? <ul>

          {
            paragraphs?.map((paragraph, i) =>
              <p key={i} className={isDetailsMode ? 'paragraph' : ' content'}>{paragraph}</p>
            )
          }
        </ul>
          :
          <section className='edit-desc-wrapper flex-jc-ac w-100'>
            <textarea className="edit-desc" name="edit-desc" id="" value={currWorkshop.desc}
              onChange={(e) => handelChange(e)}></textarea>

          </section>
        }

        {!isDetailsMode &&
          <div className="blur-overlay flex-jc-ac">
            <Link className="more" href={`workshops/${currWorkshop.id}`}>למידע נוסף</Link>
          </div>
        }
      </article>

      <div className='flex-jc-ac'>
        {
          (isOnDetailsPage) &&

          <section className='flex-col gap05 mt-1'>
            {!isEditMode && <button type='button' className='btn flex-jc-ac'>{
            isLoading ? <Spinner /> : <span onClick={onRegisterToWorkshop}>להרשמה</span>}</button>}
            <EditWorkshopBtns {...EditWorkshopBtnsProps} />

          </section>


        }

      </div>

    </section>
  )
}