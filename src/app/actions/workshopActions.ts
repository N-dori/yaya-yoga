import { Tworkshop } from "../types/types"
import { getUrl } from "../utils/util"

export const getWorkshops = async () => {

  const url = `${getUrl('workshop/getWorkshops')}`; // Append timestamp to prevent caching
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { "Content-type": "application/json" ,"Cache-Control": "no-store"},
      cache:'no-store'
    })
    if (res.ok) {
      const workshops = await res.json()
      // console.log('workshops to get workshops',workshops);
      return workshops
    }
  }
  catch (error) {
    console.log('faild to get workshops', error);

  }
}

export const getWorkshop = async (id: String) => {
  const url = getUrl('workshop/getWorkshop/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json","Cache-Control": "no-store" },
    body: JSON.stringify({ id }),
    cache:'no-store'

  })
  if (res.ok) {
    const workshop = await res.json()
    return workshop

  }

}

export const createNewWorkShop = async (workshop: Tworkshop) => {
  const url = getUrl('workshop/createWorkshop/')

  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ workshop })
  })
  if (res.ok) {
    return res.json()

  } else {
    throw new Error('faild to get a new workshop')
  }
}

export const deleteWorkshop = async (workshopId: String) => {
  const url = getUrl('workshop/removeWorkShop/')

  const res = await fetch(url, {

    method: 'DELETE',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ workshopId })
  })
  if (res.ok) {
    const msg = res.json()
    return msg

  }

}

export const updateWorkshop = async (workshopId: String, workshop: Tworkshop) => {
  const url = getUrl('workshop/updateWorkshop/')

  const res = await fetch(url, {

    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ workshopId, workshop })
  })
  if (res.ok) {
    const workshop = await res.json()
    return workshop

  }

}

export const updateUserWithNewWorkshopAtDatabase = async (membershipId: string, userId: string) => {
  try {
    const url = getUrl('user/updateUserWorkshop')

    const res = await fetch(url, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ _id: userId, membershipId })
    })
    if (res.ok) {
      const updatedUser = await res.json()

      console.log(`User id :${userId} was updated with new membership no' :${membershipId}`, updatedUser);
      return updatedUser

    } else {
      return false
    }
  } catch (error) {
    console.log('had a problem updating user with new membership', error)
  }
}