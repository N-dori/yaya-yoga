import { getUrl } from "../utils/util"

export const deleteAnnouncement = async (id: String) => {
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
    console.log('failed to get billboard')
    return false
  }

}