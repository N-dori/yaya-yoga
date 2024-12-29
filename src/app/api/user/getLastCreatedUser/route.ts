import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import User from '../../../models/user';

export async function POST (request) {

 try {
    // a way to retrieve the last object from a MongoDB collection without fetching the entire
    // collection
   await connectMongoDB()
       const lastDoc = await User.findOne().sort({ createdAt: -1 });

    if(lastDoc){

       const {_id}= lastDoc 
       
       
       return NextResponse.json(_id, {status: 201 } )
      }
      return NextResponse.json({msg:'could not find last doc'}, {status: 404 } )
    
 }catch ( err ) {
    console.log('had a problem finding last user', err);
    return NextResponse.json({message: "had a problem finding last user" }, {status: 500 } )
 }
}