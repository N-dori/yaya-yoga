
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

export const getFormattedDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString('he-IL')
}
export const getFormattedTime = (date: string | Date) => {
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
  while (currDay <= endDay) {
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
      console.log('email sent happily!!!');

    }


  } catch (error) {
    console.log('error sending Welcome Email');
  }
}