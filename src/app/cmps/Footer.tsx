import Link from 'next/link'
import React from 'react'
import { CalenderSvg } from '../assets/svgs/CalenderSvg'
import MailSvg from '../assets/svgs/MailSvg'
import PhoneSvg from '../assets/svgs/PhoneSvg'
import LocationSvg from '../assets/svgs/LocationSvg'
import Image from 'next/image'
import CerditCardSvg from '../assets/svgs/CerditCardSvg'
import { YogaSvg } from '../assets/svgs/YogaSvg'
import NewsLetter from './NewsLetter'

type Props = {}

export default function Footer({ }: Props) {
  return (
    <footer className="footer-container full">
      <div className="footer-wrapper">
        <NewsLetter/>
    
        <div className="footer-links flex-warp  flex-jc ">

          <a className='footer-link' href='mailto:yshwartz@gmail.com'><MailSvg />yshwartz@gmail.com</a>
          <a href='/' className='footer-link flex'><LocationSvg />בית פעם- סטודיו קדם, רחוב הדקלים 92, פרדס חנה-כרכור </a>
          <a className='footer-link' href='tel:052-437-7820 '><PhoneSvg />052-437-7820</a>

        </div>

      </div>
      <div className="footer-copyRight " >
        <p className='tac'> 2025 YAYA-YOGA. All rights reserved.©</p>
      </div>
      <div className='flex-jc-ac mt-2'>

      <Image className='logo' alt={'/logo-image'} width={300} height={150} src={'/logo.png'} />
      </div>
      <ul className='footer-links flex-jc-ac flex-warp gap05' >
      <Link className='link  ' href={'/weekly_schedule'} >לוח זמנים שבועי </Link>
        <Link className='link  ' href='/pricing'>מחירון </Link>
        <Link className='link  ' href='/workshops'>סדנאות </Link>

      </ul>
    </footer>


  )
}