import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../../models/user';

export async function POST (request) {

 try {
    const { _id } = await request.json();
   await connectMongoDB()
    const user = await User.findOne({ _id})
  
 
  return NextResponse.json(user, {status: 201 } )
    
 }catch ( err ) {
    console.log('had a problem finding user', err);
    return NextResponse.json({message: "had a problem getting user" }, {status: 500 } )
 }
}