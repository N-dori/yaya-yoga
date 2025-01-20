import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import Billboard from '../../../models/billboard';
import { revalidatePath } from 'next/cache';

export async function PUT(request) {
    try {
        const { id } = await request.json();
        await connectMongoDB()
        const workshopId = id
        const billboard = await Billboard.findOne({})
        if (billboard) {
            const _id = billboard._id

            const updatedBillboard = await Billboard.updateOne(
                { _id },
                { $pull: { 'announcements': { workshopId } } }
            )
            console.log('announcements', updatedBillboard);

            revalidatePath('/','page')
        }

        return NextResponse.json({ message: 'billboard was deleted' }, { status: 200 });

    } catch (err) {
        console.error('had a problem removing Billboard ', err);
        return NextResponse.json({ message: "had a problem removing Billboard" }, { status: 500 });
    }
}