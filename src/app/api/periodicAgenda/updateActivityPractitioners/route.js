import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import PeriodicAgenda from '../../../models/periodicAgenda';

export async function PUT(request) {
    try {
        const {id, email, activityId, periodicAgendaId ,name ,membershipId} = await request.json();
        let lastDoc
        if(!periodicAgendaId){
            lastDoc = await PeriodicAgenda.findOne().sort( { _id: -1 } )

        }
 

            await connectMongoDB();
    
            // Find the PeriodicAgenda document
            
            // Update the a specific activity in the array of the document
            const updatedPeriodicAgenda = await PeriodicAgenda.updateOne(
                { _id: periodicAgendaId?periodicAgendaId:lastDoc._id},
                { $push: { "activities.$[activity].practitioners": {id,email,name,membershipId} } },
                {
                  arrayFilters: [{ "activity.id": activityId }]  
                  // Filters to find the currect activity
                }
            )
            if (!updatedPeriodicAgenda) {
                return NextResponse.json({ message: "PeriodicAgenda not found" }, { status: 404 });
            }
        
            return NextResponse.json({message:'last periodic agenda was updated activity with a new practitioner '}, { status: 200 });
   
        return NextResponse.json({ message: "PeriodicAgenda not found" }, { status: 404 });


    } catch (err) {
        console.error('had a problem updating periodic agenda', err);
        return NextResponse.json({ message: "had a problem updating periodic agenda" }, { status: 500 });
    }
}