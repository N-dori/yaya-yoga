import connectMongoDB from '../../../libs/mongoDB'
import  Membership from '../../../models/membership'
import { NextResponse } from 'next/server'


export async function POST (request) {

 try {

     const  {membership}  = await request.json()
  
    console.log('#membership : ', membership);
    
      await connectMongoDB ()
      
      const newMembership = await Membership.create(membership)
     
     return NextResponse.json(
        { message: "Membership creacted", _id: newMembership._id }, 
        { status: 201 })

 }catch ( err ) {
    console.log('had a problem creating new user', err);
    return NextResponse.json({message: "Had problem during membership creation" }, {status: 500 } )
 }
}