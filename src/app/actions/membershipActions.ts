import { Tmembership } from "../types/types"
import { getUrl, getUserByEmail } from "../utils/util"

export const refundPractitionerMembershipAtDatabase = async (membershipId: string) => {
  const url = getUrl('membership/refundMembership')
  const res = await fetch(url, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      membershipId

    })
  })
  if (res.ok) {
    return await res.json()

  } else {
    return null

  }
}

export const getMembership = async (membershipId: String) => {

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