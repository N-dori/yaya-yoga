import { Tmembership, Tworkshop } from "../types/types";

export function makeId(length = 6) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

export const stripTime = (date: Date | string): Date => {
  const d = new Date(date);
  const strippedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return strippedDate;
};

export const getFormatedDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('he-IL')
}
export const getFormatedTime = (date: string | Date) => {
  let fullTime = new Date(date).toLocaleTimeString('he-IL').split(':')
  let hours = fullTime[0]
  let minutes = fullTime[1]
  return `${hours}:${minutes}`
}

export const getBaseUrl = () => {

  const baseUrl = process.env.NODE_ENV === 'development' ?
    process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_PRUD_URL
  return baseUrl
}
export const isEnglishCharacter = (str: string) => {
  const englishRegex = /^[A-Za-z]+$/;
  return englishRegex.test(str);
}
export const getUrl = (endPoint: string) => {

  const baseUrl = process.env.NODE_ENV === 'development' ?
    process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_PRUD_URL

  if (endPoint === "") return baseUrl

  const url = `${baseUrl}/api/${endPoint}`;
  // console.log(`Constructed URL: ${url}`);
  return url;
};



export const getUserByEmail = async (email: String) => {
  const url = getUrl('auth/userExists/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email })
  })
  const miniUser = await res.json()
  console.log(' my mini user in getUserBYEmail = ', miniUser);

  return miniUser
}

export const getDateType = (givenDate: Date | string) => {
  return new Date(givenDate)
}

export const isAfterToday = (givenDate: Date | string) => {
  const today = new Date()
  return today < getDateType(givenDate) ? true : false
}

export const getUser = async (_id: String) => {
  const url = getUrl('user/getUser/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id })
  })
  const user = await res.json()
  console.log(' my user in utils getUserl = '+`${_id}`, user);

  return user
}

export const getWorkshop = async (id: String) => {
  const url = getUrl('workshop/getWorkshop/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id })
  })
  if (res.ok) {
    const workshop = await res.json()
    return workshop

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
export const deleteActivity = async (activityId: String) => {
  const url = getUrl('periodicAgenda/removeActivity/')

  const res = await fetch(url, {

    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ activityId })
  })
  if (res.ok) {
    const msg = res.json()
    return msg

  }

}

export const deleteAnnouncemnt = async (id: String) => {
  const url = getUrl('announcement/removeAnnouncement/')

  const res = await fetch(url, {

    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ id })
  })
  if (res.ok) {
    const msg = res.json()
    return msg

  }

}

export const uploadBillboardImage = async (formData: FormData) => {
  try {

  } catch (error) {
    console.log(' my formData in utils uploadBillboardImage = ', formData);

  }
  const url = getUrl('s3/uploadBillboardImage/')
  const res = await fetch(url, {
    method: 'POST',
    body: formData
  },
  )
  if (res.ok) {
    return true
  } else {
    false
  }
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
export const getMembership = async (membershipId: String) => {
  // console.log(' fatching with membershipId = ', membershipId);
  const url = getUrl('membership/getMembership/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json", "Cache-Control": "no-store" },
    body: JSON.stringify({ membershipId }),
    cache: 'no-store'
  })
  const membership = await res.json()
  console.log(' the fetched membership is = ', membership);

  return membership
}
export const removeUserMembership = async (userId: String) => {
  const url = getUrl('user/removeMembership')

  const res = await fetch(url, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ userId })
  })

  const updatedUser = await res.json()

  return updatedUser
}

export const getFullUserByEmail = async (email: String) => {
  const url = getUrl('user/getFullUserByEmail/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ email }),
    cache: 'no-store'

  },)
  const user = await res.json()
  // console.log(' my user in utils getFullUserByEmail = ', user);

  return user
}
export const getPeriodicAgenda = async () => {

  const url = getUrl('periodicAgenda/getPeriodicAgenda')
  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-type": "application/json", "Cache-Control": "no-store" },
    cache: 'no-store'

  })
  if (res.ok) {
    return await res.json()

  } else {
    throw new Error('faild to get a new periodic Agenda')
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

export const pushPractionerToActivity = async (id: string, periodicAgendaId: string,
  activityId: string, membershipId: string,
  email: string, name: string) => {
  const url = getUrl('periodicAgenda/updateActivityPractitioners')
  const res = await fetch(url, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id,
      periodicAgendaId,
      activityId,
      membershipId,
      email,
      name,
    })
  })
  if (res.ok) {
    const updatedActivity = await res.json()
    console.log('adding Practitioner To Activity', updatedActivity);
    return updatedActivity
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


export const getWorkshops = async () => {

  const url = getUrl('workshop/getWorkshops')
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { "Content-type": "application/json" },
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
export const getBillboard = async () => {

  const url = getUrl('announcement/getBillboard')
  console.log('url to fetch ', url);

  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({}),
  })
  if (res.ok) {
    return await res.json()

  } else {
    throw new Error('faild to get billboard')
  }

}

export const clearBillboard = async (_id: string) => {

  const url = getUrl('announcement/removeBillboard')
  const res = await fetch(url, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id }),
  })
  if (res.ok) {
    return await res.json()

  } else {
    throw new Error('faild to remove billboard')
  }

}
export const createNewMembership = async (membership: Tmembership) => {
  const url = getUrl('membership/createNewMembership')
  const res = await fetch(url, {
    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ membership })
  })
  if (res.ok) {
    const newMembershipId = res.json()
    return newMembershipId
  }
}

export const getPlan = async (membershipType: string, email: string, paid?: number, workshopTitle?: string, expiryDate?: Date) => {

  const user = await getUserByEmail(email)

  let membership: Tmembership
  const dropInMembership: Tmembership =
  {
    userId: user._id,
    isExpired: false,
    subscription: { type: 'drop-in', entries: 1 },
    paid: 50,
    dateOfPurchase: new Date(),
  }

  const fivePassMembership: Tmembership =
  {
    userId: user._id,
    subscription: { type: 'כרטיסייה 5 כניסות', entries: 5 },
    isExpired: false,
    paid: 250,
    dateOfPurchase: new Date(),

  }
  const tenPassMembership: Tmembership =
  {
    userId: user._id,
    subscription: { type: 'כרטיסייה 10 כניסות', entries: 10 },
    isExpired: false,
    paid: 450,
    dateOfPurchase: new Date(),
  }
  const monthlyPassMembership: Tmembership =
  {
    userId: user._id,
    subscription: { type: 'חופשי חודשי', entries: 100 },
    isExpired: false,
    paid: 350,
    dateOfPurchase: new Date(),
  }

  const workshopPass: Tmembership =
  {
    userId: user._id,
    subscription: { type: 'סדנא', entries: 1, workshopTitle },
    isExpired: false,
    paid,
    dateOfPurchase: new Date(),
  }
  switch (membershipType) {
    case 'כניסה חד-פעמית':
      membership = dropInMembership
      let end = new Date(dropInMembership.dateOfPurchase);
      end.setMonth(end.getMonth() + 6); // Move 6 months ahead
      dropInMembership.end = end
      break;
    case 'סדנא':
      membership = workshopPass
      workshopPass.end = expiryDate
      console.log('workshopPass*********************', workshopPass);

      break;
    case 'כרטיסייה 5 כניסות':
      membership = fivePassMembership
      break;
    case 'כרטיסייה 10 כניסות':
      membership = tenPassMembership
      break;
    case 'חופשי חודשי':
      membership = monthlyPassMembership
      break;

    default:
      break;
  }
  return [membership, user._id]
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
export const clearPractitionersFromActivityAtDataBase = async (activityId: string, periodicAgendaId: string) => {
  try {
    const url = getUrl('periodicAgenda/removeAllPractitionersFromActivity')

    const res = await fetch(url, {
      method: 'PUT',
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ activityId, periodicAgendaId })
    })
    if (res.ok) {

      return true

    } else {
      return false
    }
  } catch (error) {
    console.log('had a problem updating user with new membership', error)
  }
}
export const isBothTheSameDate = (date1: Date, date2: Date) => {
  return date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
}
export const createYearsRange = () => {
  let years: number[] = []
  let startYear = 1900
  let currDate: number = startYear
  let endYear = new Date().getFullYear()
  while (currDate < endYear) {
    years.push(currDate)
    currDate++
  }
  return years
}
export const createMonthsRange = () => {
  let months: number[] = []
  let startMonth = 1
  let currMonth: number = startMonth
  let endMonth = 12
  while (currMonth <= endMonth) {
    months.push(currMonth)
    currMonth++
  }
  return months
}
export const createDaysRange = () => {
  let days: number[] = []
  let startDay = 1
  let currDay: number = startDay
  let endDay = 31
  while (currDay < endDay) {
    days.push(currDay)
    currDay++
  }
  return days
}
export const scrollUp = () => {
  window.scrollTo(0, 0)

}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
export const sendEmail = async (userEmail: string, userName: string, emailType: string, _id?: string) => {
  try {
    const url = getUrl('sendEmail')
    const name = userName
    const email = userEmail
    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: email, name, emailType, _id })
    })
    if (res.ok) {
      console.log('email sent happyly!!!');

    }


  } catch (error) {
    console.log('error sending Welcome Email');
  }
}