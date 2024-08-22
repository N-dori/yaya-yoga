import React, { useEffect, useState } from 'react'

type Props = {
    start: Date
    end: Date;
}

export default function LessonInfoHoursRange({ start, end }: Props) {
    const [formattedStartTime, setFormattedStartTime] = useState('');
    const [formattedEndTime, setFormattedEndTime] = useState('');

    useEffect(() => {
        const formatTime = (date: Date) => {
            const d =new Date(date)
            const hours = d.getHours().toString().padStart(2, '0');
            const minutes = d.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        };
        if(start&& end){
            setFormattedStartTime(formatTime(start));
            setFormattedEndTime(formatTime(end));

        }
    }, [start, end]);
    return (
        <section className='hours-range flex '>
            <span>{formattedStartTime}</span>
            <span>-</span>
            <span>{formattedEndTime}</span>
        </section>
    )
}