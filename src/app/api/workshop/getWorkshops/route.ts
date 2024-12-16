import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Workshop from '../../../models/workshop';

export async function GET () {

  try {
    await connectMongoDB()
     const workshops = await Workshop.find({})
   
     if(!workshops){
        return NextResponse.json({message:'workshops could not be found yet'}, {status: 404 } )
     
     }
      return NextResponse.json(workshops, {status: 200 } )
     
  }catch ( err ) {
     console.log('had a problem finding workshops', err);
     return NextResponse.json({message: "had a problem getting workshops" }, {status: 500 } )
  }
 }