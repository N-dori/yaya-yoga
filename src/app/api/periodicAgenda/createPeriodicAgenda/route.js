import connectMongoDB from '@/app/libs/mongoDB';
import PeriodicAgenda from '../../../models/periodicAgenda'
import { NextResponse } from 'next/server';

export async function POST (request) {

    try {
   
        const { periodicAgenda }  = await request.json()
   
         console.log('going to creact new Periodic Agenda :', periodicAgenda );
         await connectMongoDB ()
        
        const newPeriodicAgenda =  await PeriodicAgenda.create({...periodicAgenda})
        return NextResponse.json({newPeriodicAgenda} , {status: 201 } )
    }catch(err){
        console.log('had problem to create a Periodic Agenda ',err);
      }
    
    }