import HeathDeclerationForm from '@/app/cmps/user/HeathDeclerationForm'
import React from 'react'

type Props = {
    params:{userId:string}
}

export default function page({params}: Props) {
  return (

    <HeathDeclerationForm userId={params.userId}/>
  
  )
}