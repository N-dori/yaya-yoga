import React from 'react'
import TimeDisplay from './TimeDisplay';

type Props = {}

export default function DateTime({ }: Props) {

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-indexed
    const day = today.getDate();

    const formatedDate = `${day}/${month < 10 ? '0' + month : month}/${year} `
    return (
        <section className='flex-sb'>
            <article>{formatedDate}</article>
            <TimeDisplay />

        </section>
    )
}