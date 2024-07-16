import connectMongoDB from '@/app/libs/mongoDB';
import PeriodicAgenda from '../../models/periodicAgenda'
import { NextResponse } from 'next/server';
export async function POST (request) {

    try {
   
        const { start,end }  = await request.json()
        console.log('going to new Periodic Agenda with :', start,end );
   
         await connectMongoDB ()
         let newPeriodicAgenda =   {
            date:{start, end }
            
            }
         console.log('going to new Periodic Agenda :', newPeriodicAgenda );
        const user =  await PeriodicAgenda.create({...newPeriodicAgenda})
        return NextResponse.json({message: "PeriodicAgenda creacted" }, {status: 201 } )
    }catch(err){
        console.log('had problem to create a Periodic Agenda ');
      }
    
    }