import HeathDeclarationForm from '@/app/cmps/user/HeathDeclarationForm'
import React from 'react'

type Props = {
    params:{userId:string}
}

export default function page({params}: Props) {
  return (

    <HeathDeclarationForm userId={params.userId}/>
  
  )
}