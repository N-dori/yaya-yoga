import React from 'react'

type Props = {}

export default function CircleDeroration({}: Props) {
  return (
    <>
    <svg className="circle-dcor circle1"
         width="220" height="220" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="110" r="100" stroke="pink" strokeWidth="2" fill="pink" />
        </svg>
        {/* <svg className="circle-dcor circle2"
         width="220" height="220" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="110" r="100" stroke="lightblue" strokeWidth="2" fill="lightblue" />
        </svg> */}
    </>
  )
}