import { getUrl } from "../utils/util"

export const removePractitionerFromActivityFromDatabase = async (periodicAgendaId: string, activityId: string, email: string) => {
  const url = getUrl('periodicAgenda/removePractitionerFromActivity')
  const res = await fetch(url, {
    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      periodicAgendaId,
      activityId,
      email,

    })
  })
  if (res.ok) {
    return true

  } else {
    return false

  }
}