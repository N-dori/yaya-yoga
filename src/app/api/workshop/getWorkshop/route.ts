import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Workshop from '../../../models/workshop';

export async function POST (request) {

 try {
    const { id } = await request.json();
   await connectMongoDB()
    const workshop = await Workshop.findOne({ id})
  
    
  return NextResponse.json(workshop, {status: 201 } )
    
 }catch ( err ) {
    console.log('had a problem finding workshop', err);
    return NextResponse.json({message: "had a problem getting workshop" }, {status: 500 } )
 }
}