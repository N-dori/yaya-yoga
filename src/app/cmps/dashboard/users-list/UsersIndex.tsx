import { Tuser } from '@/app/types/types'
import React from 'react'
import UsersList from './UsersList'

type UsersIndexProps = {
    users:Tuser[]
}

export default function UsersIndex({users}: UsersIndexProps) {
  return (
    <section className="users-list-container">
  
   <UsersList users={users}/>
    </section>  )
}