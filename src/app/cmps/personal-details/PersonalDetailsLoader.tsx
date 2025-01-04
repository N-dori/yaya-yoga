import React from 'react'
import Spinner from '../Spinner'

type Props = {}

export default function PersonalDetailsLoader({ }: Props) {
    return (
      
            <section className='my-activities-container card'
                style={{ height: '475px' }}>
                <h3 className='tac title'> השיעורים שלי</h3>

                <Spinner />

            </section>
  

    )
}