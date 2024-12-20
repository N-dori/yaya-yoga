import Workshop from '@/app/models/workshop';
import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';

export async function PUT(request) {
    try {
        const { workshopId,workshop} = await request.json();

        await connectMongoDB();

        // Find the Workshop document
        console.log('WorkshopId', workshopId);
    
        // Update the a specific activity in the array of the document
        const updatedWorkshop = await Workshop.findOneAndReplace(
                { _id:  workshopId}, // Filter: Find the document by _id
                workshop,             // Replacement data
                { new: true, upsert: true } // Options: Return the updated document; create if not found
              );
     
    
        return NextResponse.json(updatedWorkshop, { status: 200 });

    } catch (err) {
        console.error('had a problem updating Workshop', err);
        return NextResponse.json({ message: "had a problem updating Workshop" }, { status: 500 });
    }
}