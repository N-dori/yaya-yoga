
import React from 'react'
import Image from 'next/image'

type DynamicImageProps = {
    url:string
    alt:string
    imgClassName?:string
}

export default   function DynamicImage({url,alt,imgClassName}: DynamicImageProps) {


    return (
        <section className='dynamic-img-container flex-jc-ac' 
        style={{position:'relative', width:'100%'}}>

    <Image
    className={imgClassName}
    src={url}
    width={0}
    height={0}
    alt={alt||''}
    // placeholder='blur'
    // blurDataURL={'123'}
    // loader={({src})=>`https://localhost:3000/${src}?thumbnail=true`}
    style={{objectFit:'cover' ,width:'100%',height:'100%'}}
    sizes='100vw'/>
    </section>
  )
}