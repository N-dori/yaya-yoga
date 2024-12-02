import EditWarpper from '@/app/cmps/dashboard/edit-periodic-agenda/EditWarpper'
import { TperiodicAgenda } from '@/app/types/types'
import { getUrl } from '@/app/utils/util'
import React from 'react'

type Props = {}
const getPeridicAgenda = async () => {
    try {
        const url = getUrl('periodicAgenda/getPeriodicAgenda')
        const res = await fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
        })
        if (res.ok) {
            return await res.json()

        } else {
            throw new Error('failed to fetch periodic agenda reason : ')
        }

    } catch (error) {
        console.log('failed to fetch periodic agenda reason : ', error);

    }
}
export default async function editperiodicAgenda({ }: Props) {
    const res = await getPeridicAgenda()
    let periodicAgenda: TperiodicAgenda
    if (res) {
        periodicAgenda = res.periodicAgenda
    }

    const editWarpperProps = {
        periodicAgenda,
    }
    return (
        <div className='gc2'>
            <EditWarpper {...editWarpperProps} />
        </div>
    )
}