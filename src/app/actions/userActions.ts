import { Tuser, TuserQuestionnaire } from "../types/types"
import { getUrl } from "../utils/util"


export const createUser = async (user: Tuser) => {
  const url = getUrl('auth/registration/')

  console.log('gettinf in create user : ', user);

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "appliction/json" },
    body: JSON.stringify(user.password ? { name: user.name, email: user.email, password: user.password, isNewUser: user.isNewUser, isAdmin: user.isAdmin }
      : { name: user.name, email: user.email, isNewUser: user.isNewUser, isAdmin: user.isAdmin }
    )

  },)
  if (res.ok) {
    return res.json()

  } else {
    throw new Error('faild to create user')

  }
}
export const toggleNewUser = async (_id: string) => {
  const url = getUrl('user/toggleNewUser/')


  const res = await fetch(url, {

    method: 'PUT',
    headers: { "Content-type": "appliction/json" },
    body: JSON.stringify({ _id }
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

export const createUserQuestionnaire = async (data: TuserQuestionnaire) => {
  try {

    const url = getUrl('user/userQeustionnaire')
    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ data })
    })

    if (res.ok) {
      const userQeustionnaire = await res.json()
      return userQeustionnaire

    } else {
      return false
    }
  } catch (error) {
    console.log('had a problem at createUserQuestionnaire ', error);

  }
}

export const updateUserWithHisQuestionnairId = async (_id:string ,userQuestionnaireId:string) => {
  const url = getUrl('user/updateUserQeustionnaire')
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
export const updateQuestionnair = async (_id:string ,userQuestionnaire:TuserQuestionnaire) => {
  const url = getUrl('user/userQeustionnaire/updateQeustionnaire')
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

export const getQuestionnair = async (_id:string ) => {
try {
  const url = getUrl('user/userQeustionnaire/getUserQeusttionnaire')
        const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ _id })
        })
        if (res.ok) {
          const questionnair = await  res.json()
          return questionnair
        }else {
          return null
        } 
  
} catch (error) {
  console.log('had aproblem getting questionnaire', error);
  
}
}