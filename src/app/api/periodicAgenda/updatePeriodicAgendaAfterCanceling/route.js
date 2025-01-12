import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import PeriodicAgenda from '../../../models/periodicAgenda';
import { revalidatePath } from 'next/cache';

export async function PUT(request) {
    try {
        const { periodicAgendaId, activityId , currCancellationState} = await request.json();

        await connectMongoDB();

        // Find the PeriodicAgenda document
        const periodicAgenda =  await PeriodicAgenda.findOne({ _id:periodicAgendaId });
        if (!periodicAgenda) {
            return NextResponse.json({ message: "PeriodicAgenda not found" }, { status: 404 });
        }

    
        // Update the a specific activity in the array of the document
        const updatedPeriodicAgenda = await PeriodicAgenda.findOneAndUpdate(
            { _id:periodicAgenda._id, "activities.id": activityId}, // brings the  activity   
            { $set: { "activities.$.isCanceled":currCancellationState?false: true }}, // change its boolean state according to the currCencelationState to cancel and to restore
            { new: true }
        )
                revalidatePath('/weekly_schedule','page')
    
        return NextResponse.json(updatedPeriodicAgenda, { status: 200 });

    } catch (err) {
        console.error('had a problem updating periodic agenda', err);
        return NextResponse.json({ message: "had a problem updating periodic agenda" }, { status: 500 });
    }
}