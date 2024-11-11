import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Membership from '../../../models/membership';

export async function POST (request) {

 try {
    const { membershipId } = await request.json();
   //  console.log('*****************- membershipId',membershipId);
    
   await connectMongoDB()
    const membership = await Membership.findOne( {membershipId})
  
 
  return NextResponse.json(membership, {status: 200 } )
    
 }catch ( err ) {
    console.log('had a problem finding membership', err);
    return NextResponse.json({message: "had a problem getting membership" }, {status: 500 } )
 }
}