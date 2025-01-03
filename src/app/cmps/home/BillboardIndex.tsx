import {  Tbillboard } from '@/app/types/types'
import { getBillboard } from '@/app/utils/util'
import BillboardList from './BillboardList'

type Props = {}

export default async function BillboardIndex({ }: Props) {
let billboard:Tbillboard
const res = await getBillboard()
if(res){
  billboard = res?.billboard
}

  
  return (
    billboard &&   
    <section className='billboard-container  flex-col flex-jc-ac gap2'>
        <h2 className='headline tac'> ארועי החודש בסטודיו</h2>
   <BillboardList announcements={billboard.announcements}/>
    </section>
  )
}