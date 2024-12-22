import Image from 'next/image'
import React from 'react'
import Content from './Content'

type AboutMeIndexProps = {}

export default function AboutMeIndex({ }: AboutMeIndexProps) {
  return (
    <section className="about-me-container flex-col gap05">
     <section className="teachers-container">
                <h3 className="meet-the-yogis-title">באו לפגוש את היוגים</h3>
                  <p className='txt'>אנחנו מקבלים תלמידים  בכל הרמות . השיעורים בסטודיו משלבים את מסגננות ההאטה יוגה, אשטנגה, וינאסה. שיעורים ממוקדים רעננים ומאתגרים. </p>
              </section>
      <h3 className='title tac'>נעים להכיר </h3>

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