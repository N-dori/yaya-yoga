import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import PeriodicAgenda from '../../../models/periodicAgenda';

export async function PUT(request) {
    try {
        const { email, activityId, periodicAgendaId ,name} = await request.json();

        await connectMongoDB();

        // Find the PeriodicAgenda document
        console.log('email', email);
        console.log('email', activityId);
        console.log('periodicAgendaId', periodicAgendaId);
        
        
        // Update the a specific activity in the array of the document
        const updatedPeriodicAgenda = await PeriodicAgenda.updateOne(
            { _id: periodicAgendaId},
            { $push: { "activities.$[activity].practitioners": {email,hasArrived:false,name} } },
            {
              arrayFilters: [{ "activity.id": activityId }]  
              // Filters to find the correct activity
            }
        )
        if (!updatedPeriodicAgenda) {
            return NextResponse.json({ message: "PeriodicAgenda not found" }, { status: 404 });
        }
    
        return NextResponse.json({message:'periodic agenda was updated activity with a new practitioner '}, { status: 200 });

    } catch (err) {
        console.error('had a problem updating periodic agenda', err);
        return NextResponse.json({ message: "had a problem updating periodic agenda" }, { status: 500 });
    }
}