'use client'
import { Tmembership, Tuser } from '@/app/types/types'
import { getMembership } from '@/app/actions/membershipActions'
import { useRouter } from 'next/navigation'
import React, {  useState } from 'react'
import MyMembershipsList from '../../personal-details/MyMembershipsList'

type UsersPreviewProps = {
  user: Tuser
}

export default function UsersPreview({ user }: UsersPreviewProps) {

  const membershipLength = user?.memberships?.length

  const [isShown, setIsShown] = useState(false)
  const [userMemberships, setUserMemberships] = useState<Tmembership[]>(null)
  const [currUserId, setCurrUserId] = useState('')
  const router = useRouter()

  const getMyMemberships = async () => {
    const userMembershipsPromises = user.memberships.map(membership => getMembership(membership))
    const userMemberships = await Promise.all(userMembershipsPromises)
    setUserMemberships(userMemberships)
  }
  const getNumberOfMembershipsUserOwn = () => {
    if (membershipLength) {
      return membershipLength > 1 ?
        `ישנם ${membershipLength} מנויים `
        : `ישנו מנוי 1`
    } else {
      return 'אין מנוי'
    }

  }
  return (
    <li className='user-card-container ' >
      <section className='user-wrapper flex-sb' >
        <p className='user-name'>{user.name}</p>
        <svg className={'practitioners-arrow pointer'} onClick={() => { setIsShown(!isShown); setCurrUserId(user._id) }} style={isShown ? { transform: `rotate(-90deg)` } : {}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>
      </section>

      {(isShown && currUserId) &&
        <section className='user-additional-info flex-col  gap1'>

          <article className='flex gap1'>
            <span className='bold'>אי-מייל</span><span>{user.email}</span>
          </article>

          <article className='flex gap1'>
            <span className='bold'> מנוי פעיל?</span>
            <span>{getNumberOfMembershipsUserOwn()}</span>
            <span onClick={() => getMyMemberships()} className='underline pointer'>לפרטים נוספים</span>

          </article>
          {userMemberships && <article> <MyMembershipsList memberships={userMemberships} />
          </article>}

          <article className='flex gap1'>
            <p className='bold'> הצהרת בריאות </p>
            <p>{user.healthDeclaration ? <span className='underline pointer' onClick={() => router.replace(`${user.healthDeclaration}`)}>קישור להורדה</span> : <span>חסר</span>}</p>
          </article>

          <article className='flex gap1'>
            <p className='bold'>שאלון אישי</p>
            <p>{user.userQuestionnaireId ? <span className='underline pointer'
              onClick={() => router.replace(`/userQuestionnaire/${'U' + user.userQuestionnaireId}`)}>
              צפיה / עדכון פרטי המתרגל</span>
              :
              <span className='underline pointer'
                onClick={() => router.replace(`/userQuestionnaire/${user.userQuestionnaireId}`)} > שאלון  רייק - לחץ למלא</span>}</p>

          </article>

        </section>}



    </li>)
}