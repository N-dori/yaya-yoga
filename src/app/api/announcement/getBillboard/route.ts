import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Billboard from '../../../models/billboard';

export async function POST (request) {

 try {
    // a way to retrieve the last object from a MongoDB collection without fetching the entire
    // collection
   await connectMongoDB()
    const lastDoc = await Billboard.findOne().sort( { _id: -1 } )
    if(lastDoc){
       const {_id}= lastDoc 

       
       const billboard= await Billboard.findOne({_id})
       
       return NextResponse.json({billboard}, {status: 201 } )
      }else{
         
         return NextResponse.json({massage:'no billboard was published'}, {status: 201 } )
      }
    
 }catch ( err ) {
    console.log('had a problem finding Billboard', err);
    return NextResponse.json({message: "had a problem Billboard" }, {status: 500 } )
 }
}