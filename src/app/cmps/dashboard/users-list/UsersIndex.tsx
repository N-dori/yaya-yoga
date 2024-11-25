import { Tuser } from '@/app/types/types'
import React from 'react'
import UsersList from './UsersList'

type UsersIndexProps = {
    users:Tuser[]
}

export default function UsersIndex({users}: UsersIndexProps) {
  return (
    <table className="users-table">
    <thead className='table-head'>
      <tr>
        <th> שם</th>
        <th> מנוי</th>
        <th> הצהרת בריאות </th>
        <th> שאלון אישי  </th>
      </tr>
    </thead>
   <UsersList users={users}/>
    </table>  )
}