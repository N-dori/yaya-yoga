import React from 'react'

type Props = {}

export default function CircleDeroration({}: Props) {
  return (
    <>
    <svg className="circle-dcor circle1"
         width="220" height="220" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="110" r="100" stroke="#d4c0ac6b" strokeWidth="2" fill="#d4c0ac6b" />
        </svg>
        <svg className="circle-dcor circle2"
         width="220" height="220" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="110" r="100" stroke="#d4c0ac6b" strokeWidth="2" fill="#d4c0ac6b" />
        </svg>
    </>
  )
}