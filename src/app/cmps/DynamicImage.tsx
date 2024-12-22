import React from 'react'
import { getImage } from '../utils/util'
import Image from 'next/image'

type DynamicImageProps = {
    url:string
    alt:string
    imgClassName?:string
}

export default async function DynamicImage({url,alt,imgClassName}: DynamicImageProps) {
  const {base64, img } = await getImage(url) 
    return (
        <section className='dynamic-img-container flex-jc-ac' 
        style={{position:'relative', width:'100%'}}>

    <Image
    className={imgClassName}
    {...img}
    width={0}
    height={0}
    alt={alt||''}
    placeholder='blur'
    blurDataURL={base64}
    style={{objectFit:'cover' ,width:'100%',height:'100%'}}
    sizes='100vw'/>
    </section>
  )
}