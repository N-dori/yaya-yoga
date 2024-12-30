import { getUrl } from "../utils/util"

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

