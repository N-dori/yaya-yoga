import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import PeriodicAgenda from '../../../models/periodicAgenda';

export async function PUT(request) {
    try {
        const { activityId, periodicAgendaId, email } = await request.json();
    

        await connectMongoDB();

        // Find the PeriodicAgenda document

        // pull remove an element from the middle of the array
        const updatedPeriodicAgenda = await PeriodicAgenda.updateOne(
            { _id: periodicAgendaId },
            { $pull: { "activities.$[activity].practitioners": { email } } },
            {
                arrayFilters: [{ "activity.id": activityId }]
                // Filters to find the correct activity
            }
        )
        if (!updatedPeriodicAgenda) {
            return NextResponse.json({ message: "PeriodicAgenda not found" }, { status: 404 });
        }

        return NextResponse.json({ message: 'periodic agenda was updated after removing practitioner from activity' }, { status: 200 });

    } catch (err) {
        console.error('had a problem removing practitioner from activity', err);
        return NextResponse.json({ message: "had a problem removing practitioner from activity" }, { status: 500 });
    }
}