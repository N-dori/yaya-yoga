import Image from 'next/image'
import React from 'react'

type Props = {}

export default function ThisMounthIndex({ }: Props) {
  return (
    <section className='this-mounth-index-container flex-ac-jc'>
      <h2 className='headline tac'> ארועי החודש בסטודיו</h2>
      <h3 className='this-mounth-event-title'>רביעי קהילתי - מפגש חורף </h3>
      <h3 className='this-mounth-event-date'>11/12/24 </h3>
      <div className='image-conatiner flex-ac-jc'>
        <Image className='this-mounth-event-image'
        style={{width:'100%',height:'100%'}}
          quality={90} src={'/this-month.jpeg'}
          sizes="100vw"
          objectFit="cover"
          width={0}
          height={0}
           alt={'this mounth event image'}  />

      </div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit labore</p>
    </section>
  )
}