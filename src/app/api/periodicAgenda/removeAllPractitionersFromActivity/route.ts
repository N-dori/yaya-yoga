import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import PeriodicAgenda from '../../../models/periodicAgenda';

export async function PUT(request) {
    try {
        const { activityId, periodicAgendaId } = await request.json();
    

        await connectMongoDB();

        // Find the PeriodicAgenda document

        
        const result = await PeriodicAgenda.updateOne(
            { _id: periodicAgendaId },
            { $set: { "activities.$[activity].practitioners": [] } },
            {
                arrayFilters: [{ "activity.id": activityId }]
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json({ message: "PeriodicAgenda or activity not found" }, { status: 404 });
        }

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "No changes made; array might already be empty" }, { status: 200 });
        }

        return NextResponse.json({ message: "Activity's practitioners array was cleared successfully" }, { status: 200 });

    } catch (err) {
        console.error('Problem clearing practitioners array from activity:', err);
        return NextResponse.json({ message: "Error clearing practitioners array from activity" }, { status: 500 });
    }
}