
import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../../models/user'

export async function POST (request) {

 try {

     const {  email  } = await request.json()
   //   console.log('chacking if this email',email+' '+"exists");
    await connectMongoDB ()
    const user =  await User.findOne({ email })
    const minUser = {_id:user._id, isNewUser:user.isNewUser}
   //  console.log('user', user  );
 
  return NextResponse.json(minUser, {status: 201 } )

 }catch ( err ) {
    console.log('had a problem finding user', err);
    return NextResponse.json(null, {status: 500 } )
 }
}
