import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import PeriodicAgenda from '../../../models/periodicAgenda';

export async function POST (request) {

 try {
    // a way to retrieve the last object from a MongoDB collection without fetching the entire collection
   await connectMongoDB()
    const lastDoc = await PeriodicAgenda.findOne({}, { sort: { _id: -1 } });
    const {_id}= lastDoc 
    const periodicAgenda= await PeriodicAgenda.findOne({_id})
 
  return NextResponse.json({periodicAgenda}, {status: 201 } )
    
 }catch ( err ) {
    console.log('had a problem finding periodic Agenda', err);
    return NextResponse.json({message: "had a problem periodic Agenda" }, {status: 500 } )
 }
}