import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Workshop from '../../../models/workshop';

export async function GET () {

 try {
    // const { } = await request.json();
   await connectMongoDB()
    const workshops = await Workshop.find({})
  
    console.log('in route : workshop', workshops);
    
  return NextResponse.json(workshops, {status: 200 } )
    
 }catch ( err ) {
    console.log('had a problem finding workshop', err);
    return NextResponse.json({message: "had a problem getting workshop" }, {status: 500 } )
 }
}