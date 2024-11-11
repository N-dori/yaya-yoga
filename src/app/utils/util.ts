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
export const getBaseUrl = () => {

  const baseUrl = process.env.NODE_ENV === 'development' ?
    process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_PRUD_URL
  return baseUrl
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
  // console.log(' my mini user in getUserBYEmail = ', miniUser);

  return miniUser
}
export const getUser = async (_id: String) => {
  const url = getUrl('user/getUser/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ _id })
  })
  const user = await res.json()
  // console.log(' my user in utils getUserl = ', user);

  return user
}
export const getMembership = async (membershipId: String) => {
  console.log(' fatching with membershipId = ', membershipId);
  const url = getUrl('membership/getMembership/')

  const res = await fetch(url, {

    method: 'POST',
    headers: { "Content-type": "application/json","Cache-Control": "no-store"  },
    body: JSON.stringify({membershipId}),
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
  console.log(' my user in utils getFullUserByEmail = ', user);

  return user
}
export const getPreiodicAgenda = async () => {
  try {
    const url = getUrl('periodicAgenda/getPeriodicAgenda')
    const res = await fetch(url, {
      method: 'POST',
      headers: { "Content-type": "application/json" },
    })
    if (res.ok) {

      return await res.json()

    } else {
      throw new Error('faild to get a new periodic Agenda')
    }
  } catch (err) {
    console.log('failed to fetch a periodic agenda reason: ', err);
  }
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