import PeriodicAgendaPreviewDisplay from '@/app/cmps/dashboard/create-periodic-agenda/PeriodicAgendaPreviewDisplay'
import EditWarpper from '@/app/cmps/dashboard/edit-periodic-agenda/EditWarpper'
import { TperiodicAgenda } from '@/app/types/types'
import React from 'react'

type Props = {}
const getPeridicAgenda =async () => {

    const res = await fetch('http://localhost:3000/api/periodicAgenda/getPeriodicAgenda',{
        method: 'POST',
        headers: { "Content-type": "application/json" },
        
})
if(res.ok){
    return await res.json()
    
}
}
export default async function editperiodicAgenda({}: Props) {
    const {periodicAgenda } = await getPeridicAgenda() 

const editWarpperProps ={
    periodicAgenda ,
}
    return (
    <div className='gc2'>
        <EditWarpper {...editWarpperProps} />
       

        
    </div>
  )
}