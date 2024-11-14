import { Tpractitioner } from '@/app/types/types'
import React, { useEffect, useState } from 'react'
import PractitionersCircleList from './PractitionersCircleList'
import PractitionersList from './PractitionersList'

type ParticipantsIndexProps = {
  practitioners: Tpractitioner[]
  askUserIfToRemoveHimFromActivity: (membershipId:string) => void
}

export default function PractitionersIndex({askUserIfToRemoveHimFromActivity, practitioners }: ParticipantsIndexProps) {
  const [isShown, setisShown] = useState(false)
  useEffect(() => {

  }, [practitioners.length])

const PractitionersListProps = {
  practitioners,
  askUserIfToRemoveHimFromActivity
}
  return (
    <section className='practitioners-index-container grid'>
      {isShown && <PractitionersList {...PractitionersListProps} />}
      <PractitionersCircleList practitioners={practitioners} />
      <div className='flex-sb gc2 '>
        <p>{practitioners?.length === 1 && <span>מתרגל</span>} {practitioners?.length}  {practitioners.length >= 2 && <span>מתרגלים</span>} </p>
        <svg className={'practitioners-arrow'} onClick={() => setisShown(!isShown)} style={isShown ? { transform: `rotate(90deg)` } : {}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" /></svg>

      </div>
    </section>
  )
}