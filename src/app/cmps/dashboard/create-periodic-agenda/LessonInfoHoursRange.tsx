import { getDateType, getFormattedTime } from '@/app/utils/util';
import React, { useEffect, useState } from 'react'

type Props = {
    start: Date | undefined | null
    end: Date | undefined | null;
    isCanceled: boolean

}

export default function LessonInfoHoursRange({ isCanceled, start, end }: Props) {
    const [formattedStartTime, setFormattedStartTime] = useState('');
    const [formattedEndTime, setFormattedEndTime] = useState('');

    useEffect(() => {
        if (start && end) {
            setFormattedStartTime(getFormattedTime(start));
            setFormattedEndTime(getFormattedTime(end));
            getTimeRemainder()
        }
    }, [start, end]);

    const getTimeRemainder = () => {

        const diffInMilliseconds = +new Date(end) - +new Date(start);

        const totalRemainderInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
//to round a number to the nearest multiple of 5 
        return Math.ceil(totalRemainderInMinutes / 5)*5

        // Output the result
    }
    return (
        <section style={isCanceled ? { textDecoration: ' line-through' } : {}} className='hours-range flex-col '>
            <section className='flex'>
                <span>{formattedStartTime}</span>
                <span>-</span>
                <span>{formattedEndTime}</span>
            </section>
            <section className='time-remainder'>
                {Math.ceil(getTimeRemainder())} דקות
            </section>
        </section>
    )
}