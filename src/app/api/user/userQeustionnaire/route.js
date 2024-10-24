import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import UserQuestionnaire from '../../../models/userQuestionnaire'

export async function POST (request) {

 try {

     const { data } = await request.json()
  
      await connectMongoDB ()
      const userQuestionnaire =  await UserQuestionnaire.create(data)
      return NextResponse.json(
        { message: "User created", _id: userQuestionnaire._id }, 
        { status: 201 }
      );
   
 }catch ( err ) {
    console.log('had a problem creating new userQuestionnaire', err);
    return NextResponse.json({message: "Had problem during posting userQuestionnaire" }, {status: 500 } )
 }
}