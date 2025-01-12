import {  Tannouncement, Tbillboard } from '@/app/types/types'
import { getBillboard, makeId } from '@/app/utils/util'
import BillboardList from './BillboardList'
import EmblaCarousel from '../EmblaCarousel'

type Props = {}

export default async function BillboardIndex({ }: Props) {
let billboard:Tbillboard
const res = await getBillboard()
if(res){
  billboard = res?.billboard
}
const slides:Tannouncement[] = billboard?.announcements?.map(announcement => {
  return {
    id:makeId(),
    img:announcement.img,
    title:announcement.title,
    subTitle:announcement.subTitle,
    desc:announcement.desc,
    date:announcement.date,
    hours:announcement.hours,
    price:announcement.price,
    workshopId:announcement.workshopId
    
  }
})

  
  return (
    billboard &&   
    <section className='billboard-container flex-col '>
        <h2 className='headline tac'> ארועי החודש בסטודיו</h2>
       
     <EmblaCarousel slides={slides}/>

    
     </section>
     
  )
}