import {  Tbillboard } from '@/app/types/types'
import { getBillboard } from '@/app/utils/util'
import BillboardList from './BillboardList'

type Props = {}

export default async function BillboardIndex({ }: Props) {
let billboard:Tbillboard
const res = await getBillboard()
if(res){
  billboard = res?.billboard
  console.log('annuncements in hpme page',billboard?.announcements);
}

  
  return (
    billboard &&   
    <section className='this-mounth-index-container  flex-col gap1'>
        <h2 className='headline tac'> ארועי החודש בסטודיו</h2>
   <BillboardList announcements={billboard.announcements}/>
    </section>
  )
}