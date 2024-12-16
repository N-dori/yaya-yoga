import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../../models/user';

export async function POST () {

 try {
   await connectMongoDB()
    const users = await User.find({})
  
   if(users){
     return NextResponse.json(users, {status: 201 } )
     
    }
    return NextResponse.json({message:'users could not be found yet'}, {status: 404 } )
    
 }catch ( err ) {
    console.log('had a problem finding users', err);
    return NextResponse.json({message: "had a problem getting users" }, {status: 500 } )
 }
}