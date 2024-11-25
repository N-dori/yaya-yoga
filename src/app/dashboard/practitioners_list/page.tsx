import UsersIndex from '@/app/cmps/dashboard/users-list/UsersIndex'
import { Tuser } from '@/app/types/types'
import { getUsers } from '@/app/utils/util'
import React from 'react'

type Props = {}
export default async function page({}: Props) {

  const users:Tuser[] = await getUsers()

  return (
    <main className='users-table-conatiner gc2 p-1'>
          <h2 className='tac'>רשימת תלמידים </h2>

  <UsersIndex users={users}/>

     
    </main>
  )
}