import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Billboard from '../../../models/billboard'
import { Tannouncement, Tbillboard } from '@/app/types/types'
import { revalidatePath } from 'next/cache';
export async function POST (request) {

 try {

     const { announcements }: { announcements: Tannouncement[] } = await request.json()
  
     await connectMongoDB ()
     const lastDoc = await Billboard.findOne().sort({ createdAt: -1 });
     let billboard:Tbillboard
     if(lastDoc){
         const {_id}= lastDoc 
         let updatedDoc:Tbillboard
       
             updatedDoc = await Billboard.findOneAndUpdate(
                { _id },
                { _id, announcements },
                { new: true, upsert: true } // Create if not exists, return updated document
              );
            
            revalidatePath('/','page')
            revalidatePath('/dashboard/create_announcement','page')
            return NextResponse.json({message: "billboard was updated/overwirtten",updatedDoc }, {status: 201 } )
    }else{
         billboard =  await Billboard.create({announcements})

         return NextResponse.json({message: "billboard creacted",billboard }, {status: 201 } )
     }
     
 

 }catch ( err ) {
    console.log('had a problem creating new billboard', err);
    return NextResponse.json({message: "Had problem during creating new billboard" }, {status: 500 } )
 }
}