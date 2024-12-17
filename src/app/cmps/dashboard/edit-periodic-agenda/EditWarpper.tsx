"use client"
import React, { useState } from 'react'
import PeriodicAgendaPreviewDisplay from '../create-periodic-agenda/PeriodicAgendaPreviewDisplay'
import { TperiodicAgenda } from '@/app/types/types'

type EditWarpperProps = {
    periodicAgenda:TperiodicAgenda
}

export default function EditWarpper({periodicAgenda}: EditWarpperProps) {
    const [currPeriodicAgenda, setCurrPeriodicAgenda] = useState<TperiodicAgenda>(periodicAgenda)

const periodicAgendaPreviewDisplayProps ={
    periodicAgenda:currPeriodicAgenda,
    isWorkInProgress: false,
    setCurrPeriodicAgenda,
    
    
}
  return (
    periodicAgenda&&
    <PeriodicAgendaPreviewDisplay {...periodicAgendaPreviewDisplayProps}/>
)
}