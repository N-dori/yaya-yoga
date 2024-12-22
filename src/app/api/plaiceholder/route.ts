import { NextResponse } from 'next/server'
import { getPlaiceholder } from 'plaiceholder';

export async function POST (request) {

 try {
    const { src }  = request.json()

        
        // Dynamically import plaiceholder
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
      
        const { metadata: { height, width }, ...placeholder } = await getPlaiceholder(buffer, { size: 10 });
      
      
        return NextResponse.json({
            ...placeholder,
            img: { src, height, width },
          }, {status: 200 } )
      
  
 
    
 }catch ( err ) {
    console.log('had a problem  get Plaiceholder', err);
    return NextResponse.json({message: "had a problem get Plaiceholder" }, {status: 500 } )
 }
}