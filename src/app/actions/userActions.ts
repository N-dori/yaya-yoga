import { Tuser } from "../types/types"
import { getUrl } from "../utils/util"

export const createUser = async (user: Tuser) => {
    const url = getUrl('auth/registration/')


    const res = await fetch(url, {

        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify(user.password?{ name:user.name, email:user.email, password:user.password, isNewUser:user.isNewUser, isAdmin:user.isAdmin}
                                    : {name:user.name, email:user.email,isNewUser:user.isNewUser, isAdmin:user.isAdmin}
        )

      },)
  if (res.ok) {
    return res.json()

  } else {
    throw new Error('faild to create user')

  }
}
export const toggleNewUser = async (_id:string) => {
    const url = getUrl('user/toggleNewUser/')


    const res = await fetch(url, {

        method: 'PUT',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify({ _id}
        )

      },)
  if (res.ok) {
    return res.json()

  } else {
    throw new Error('faild to create user')

  }
}

export const updateUserWithNewMembershipAtDatabase = async (membershipId: string, userId: string, wasMembershipJustPurchesed: boolean) => {
  try {
    const url = getUrl('user/updateUserMembership')

    const res = await fetch(url, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id: userId, membershipId, wasMembershipJustPurchesed })
    })
    if (res.ok) {
      const updatedUser = await res.json()

      console.log(`User id :${userId} was updated with new membership no' :${membershipId}`, updatedUser);
      return [true, updatedUser]

    } else {
      return [false, null]
    }
  } catch (error) {
    console.log('had a problem updating user with new membership', error)
  }
}