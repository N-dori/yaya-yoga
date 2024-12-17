import Image from 'next/image'
import React from 'react'
import Content from './Content'

type AboutMeIndexProps = {}

export default function AboutMeIndex({ }: AboutMeIndexProps) {
  return (
    <section className="about-me-container flex-col gap05">
      <h2 className='title tac'>נעים להכיר </h2>

      <div className='flex-jc-ac'>

        <Image className='me-image'
          style={{ width: '100%' }}
          quality={90} src={'/2.jpg'}
          sizes="100vw"
          width={0}
          height={300}
          alt={'image of myself'} />
      </div>
    
      <Content/>
    </section>
  )
}