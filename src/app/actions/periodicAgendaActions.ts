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

export const updatePeriodicAgendaAfterCancelling = async (periodicAgendaId: string, activityId: string, currCancellationState: boolean) => {
    const url = getUrl('periodicAgenda/updatePeriodicAgendaAfterCanceling')
        const res = await fetch(url, {
          method: 'PUT',
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ periodicAgendaId, activityId, currCancellationState })
        })
        if (res.ok) {
          const updatedPeriodicAgenda = await res.json()
        return updatedPeriodicAgenda
        }else {
          return false
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