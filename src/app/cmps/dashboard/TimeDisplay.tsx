'use client'

import { useEffect, useState } from "react"

type Props = {}

export default function TimeDisplay({ }: Props) {
    const [time, setTime] = useState("")
    useEffect(() => {
        setInterval(() => {
            const today = new Date();
            const hours = today.getHours();
            const minutes = today.getMinutes();
            const seconds = today.getSeconds();
            const formatedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
            setTime(formatedTime)
        }, 1000)

    }, [])

    return (
        <div>{time}</div>
    )
}