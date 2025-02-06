import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import Workshop from '../../../models/workshop';
import { revalidatePath } from 'next/cache';

export async function DELETE(request) {
    try {
        const { workshopId } = await request.json();
    
        await connectMongoDB()
       
        const updatedWorkshop = await Workshop.deleteOne(
            { _id: workshopId },   
        )
        console.log('updatedWorkshop',updatedWorkshop);
        
        revalidatePath('/workshops','page')

        return NextResponse.json({ message: 'workshop was deleted' }, { status: 200 });
        
    } catch (err) {
        console.error('had a problem removing Workshop ', err);
        return NextResponse.json({ message: "had a problem removing Workshop" }, { status: 500 });
    }
}