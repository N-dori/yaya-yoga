import { Tuser } from '@/app/types/types'
import React from 'react'
import UsersPreview from './UsersPreview'

type UsersListProps = {
    users:Tuser[]

}

export default function UsersList({users}: UsersListProps) {
  return (
    <tbody>

        {users&&
        users.map(user=> <UsersPreview key={user._id} user={user}/>)
      }
  </tbody>  )
}