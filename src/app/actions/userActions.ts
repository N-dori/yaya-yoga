import { Tuser, TuserQuestionnaire } from "../types/types"
import { getUrl } from "../utils/util"

export const getUser = async (_id: String) => {
  const url = getUrl('user/getUser/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id })
  })
  const user = await res.json()
  console.log(' my user in utils getUser = '+`${_id}`, user);

  return user
}


export const getUsers = async () => {
  const url = getUrl('user/getUsers/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
  })
  if (res.ok) {
    const users = await res.json()
    //  console.log(' my users in utils getUserl = ', users);
    return users

  } else {
    console.log('thare has been a problem getting users');

  }

}

export const createUser = async (user: Tuser) => {
  const url = getUrl('auth/registration/')

  console.log('getting in create user : ', user);

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user.password ? { name: user.name, email: user.email, password: user.password, isNewUser: user.isNewUser, isAdmin: user.isAdmin }
      : { name: user.name, email: user.email, isNewUser: user.isNewUser, isAdmin: user.isAdmin }
    )

  },)
  if (res.ok) {
    return res.json()

  } else {
    throw new Error('failed to create user')

  }
}

export const getLastUserId = async () => {

  const url = getUrl('user/getLastCreatedUser')
  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    cache: 'no-store'
  })
  if (res.ok) {
    return await res.json()

  } else {
    throw new Error('faild to get new user _id')
  }

}

export const toggleNewUser = async (_id: string) => {
  const url = getUrl('user/toggleNewUser/')


  const res = await fetch(url, {

    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id }
    )

  },)
  if (res.ok) {
    return res.json()

  } else {
    throw new Error('failed to create user')

  }
}

export const updateUserWithNewMembershipAtDatabase = async (membershipId: string, userId: string, wasMembershipJustPurchased: boolean) => {
  try {
    const url = getUrl('user/updateUserMembership')

    const res = await fetch(url, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id: userId, membershipId, wasMembershipJustPurchased })
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

export const createUserQuestionnaire = async (data: TuserQuestionnaire) => {
  try {

    const url = getUrl('user/userQuestionnaire')
    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ data })
    })

    if (res.ok) {
      const userQuestionnaire = await res.json()
      return userQuestionnaire

    } else {
      return false
    }
  } catch (error) {
    console.log('had a problem at createUserQuestionnaire ', error);

  }
}

export const updateUserWithHisQuestionnaireId = async (_id:string ,userQuestionnaireId:string) => {
  const url = getUrl('user/updateUserQuestionnaire')
  const result = await fetch(url, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id , userQuestionnaireId })
  })
  if (result.ok) {
    return true
  } else {
    return false
  }
}
export const updateQuestionnaire = async (_id:string ,userQuestionnaire:TuserQuestionnaire) => {
  const url = getUrl('user/userQuestionnaire/updateUserQuestionnaire')
  const result = await fetch(url, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id , userQuestionnaire })
  })
  if (result.ok) {
    return true
  } else {
    return false
  }
}

export const getQuestionnaire = async (_id:string ) => {
try {
  const url = getUrl('user/userQuestionnaire/getUserQuestionnaire')
        const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ _id })
        })
        if (res.ok) {
          const questionnaire = await  res.json()
          return questionnaire
        }else {
          return null
        } 
  
} catch (error) {
  console.log('had a problem getting questionnaire', error);
  
}
}