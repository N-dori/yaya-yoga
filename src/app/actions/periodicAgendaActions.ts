import { getUrl } from "../utils/util"

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
    throw new Error('failed to get a new periodic Agenda')
  }

}

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

export const deleteActivity = async (activityId: String) => {
  const url = getUrl('periodicAgenda/removeActivity/')

  const res = await fetch(url, {

    method: 'PUT',
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ activityId })
  })
  if (res.ok) {
    const msg = await res.json()
    return msg

  }

}

export const pushPractitionerToActivity = async (id: string, periodicAgendaId: string,
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