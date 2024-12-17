import connectMongoDB from '@/app/libs/mongoDB';
import Workshop from '../../../models/workshop'
import { NextResponse } from 'next/server';

export async function POST (request) {

    try {
   
        const { workshop }  = await request.json()
   
         console.log('going to creact new Workshop :', workshop );
         await connectMongoDB ()
        
        const newWorkshop =  await Workshop.create({...workshop})
        return NextResponse.json({newWorkshop} , {status: 201 } )
    }catch(err){
        console.log('had problem to create a Workshop ',err);
      }
    
    }