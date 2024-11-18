import connectMongoDB from '../../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import UserQuestionnaire from '../../../../models/userQuestionnaire';

export async function POST (request) {

 try {
    const { _id } = await request.json();
   await connectMongoDB()
    const userQuestionnaire = await UserQuestionnaire.findOne({ _id})
  
 
  return NextResponse.json(userQuestionnaire, {status: 200 } )
    
 }catch ( err ) {
    console.log('had a problem finding user questionnaire', err);
    return NextResponse.json({message: "had a problem user questionnaire" }, {status: 500 } )
 }
}