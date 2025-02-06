import connectMongoDB from '@/app/libs/mongoDB';
import PeriodicAgenda from '../../../models/periodicAgenda';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    const { periodicAgenda } = await request.json();


    await connectMongoDB();

    let newPeriodicAgenda;

    if (periodicAgenda._id) {
      // Replace an existing document based on the provided _id
      newPeriodicAgenda = await PeriodicAgenda.findOneAndReplace(
        { _id: periodicAgenda._id }, // Filter: Find the document by _id
        periodicAgenda,             // Replacement data
        { new: true, upsert: true } // Options: Return the updated document; create if not found
      );
      
    } else 
    {
      // Create a new document
      newPeriodicAgenda = await PeriodicAgenda.create(periodicAgenda);
    }

    revalidatePath('/weekly_schedule', 'page')
    revalidatePath('/workshops', 'page')
    return NextResponse.json({ newPeriodicAgenda }, { status: 201 });
  } catch (err) {
    console.error('Error handling Periodic Agenda:', err);
    return NextResponse.json(
      { error: 'Failed to handle Periodic Agenda request' },
      { status: 500 }
    );
  }
}
