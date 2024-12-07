import {  Tbillboard } from '@/app/types/types'
import { getBillboard } from '@/app/utils/util'

import Image from 'next/image'
import BillboardList from './BillboardList'

type Props = {}

export default async function BillboardIndex({ }: Props) {

const {billboard} : {billboard:Tbillboard}= await getBillboard()
console.log('annuncements in hpme page',billboard?.announcements);

  
  return (
    billboard &&   
    <section className='this-mounth-index-container  flex-col gap1'>
        <h2 className='headline tac'> ארועי החודש בסטודיו</h2>
   <BillboardList announcements={billboard.announcements}/>
    </section>
  )
}