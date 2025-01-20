import TrashSvg from '@/app/assets/svgs/TrashSvg'
import { makeId } from '@/app/utils/util'
import React, { useEffect, useState } from 'react'

type RepeatingActivityRadioBtnsProps = {
    setIsActivityRepeating: (isActivityRepeating: boolean) => void
    isActivityRepeating: boolean
    repetitionNumber: number
    setRepetitionNumber: (repetitionNumber: number) => void
    removeSaturdays: () => void
}

export default function RepeatingActivityRadioBtns({
    removeSaturdays, setRepetitionNumber, isActivityRepeating, setIsActivityRepeating }: RepeatingActivityRadioBtnsProps) {
    const [selectedRadioBtn, setSelectedRadioBtn] = useState<string>('חד-פעמית')

    const [opt, setOpt] = useState([
        { id: makeId(), label: 'חזרתית' },
        { id: makeId(), label: 'חד-פעמית' },
    ])

    useEffect(() => {
        setIsActivityRepeating(selectedRadioBtn === 'חזרתית')
    }, [selectedRadioBtn])

    const handleSelectedActivity = (ev: React.ChangeEvent<HTMLInputElement>, label: string) => {
        
        setSelectedRadioBtn(label)
    }
    const handelRepeationNumberChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setRepetitionNumber(+ev.target.value)

    }

    return (
        <fieldset className='fieldset-form p-1'>
            <legend>פעילות חזרתית?</legend>
            {opt.map(btn =>
                <section key={btn.id}>
                    <label htmlFor={`repeat-btn-${btn.id}`}>
                        <input
                            className={`repeat-btn`}
                            onChange={(ev) => handleSelectedActivity(ev, btn.label)}
                            type="radio"
                            checked={btn.label === selectedRadioBtn }
                            name="repeat-btn"
                            value={btn.label}
                        />
                        {btn.label}
                    </label><br />
                </section>
            )}
            {isActivityRepeating &&
                <section className='flex-col gap1'>
                    <small>ציין את מספר החזרות או -1 לכל התקופה </small>
                    <input onChange={handelRepeationNumberChange} className='number-input' type="number" defaultValue={-1} />
                   <p className='flex-ac pointer' onClick={()=>removeSaturdays()}><TrashSvg/>לחץ להסרת שבתות</p>
                </section>
            }
        </fieldset>
    )
}