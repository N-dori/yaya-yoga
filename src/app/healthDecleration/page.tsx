import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  redirect('/')
  return (
    <div>page</div>
  )
}