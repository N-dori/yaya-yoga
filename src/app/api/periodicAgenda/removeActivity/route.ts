import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import PeriodicAgenda from '../../../models/periodicAgenda';

export async function PUT(request) {
    try {
        const { activityId } = await request.json();
        // Find the last PeriodicAgenda document
        const lastDoc = await PeriodicAgenda.findOne().sort({ createdAt: -1 });
        if(lastDoc){
            const {_id}= lastDoc 

           await connectMongoDB();
           // pull remove an element from the middle of the array
           const updatedPeriodicAgenda = await PeriodicAgenda.updateOne(
               { _id },
               { $pull: { "activities": { id: activityId } } }
            )
            
            return NextResponse.json({ message: 'periodic agenda was updated after removing  activity' }, { status: 200 });
        }

            return NextResponse.json({ message: "PeriodicAgenda not found" }, { status: 404 });
        

    } catch (err) {
        console.error('had a problem removing  activity', err);
        return NextResponse.json({ message: "had a problem removing  activity" }, { status: 500 });
    }
}