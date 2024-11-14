import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import Membership from '../../../models/membership';
import { Tmembership } from '@/app/types/types';

export async function PUT(request) {
    try {
        const { membershipId } = await request.json();
        await connectMongoDB();

        // add subscription.entries by 1  

        const updatedMembership: Tmembership = await Membership.findByIdAndUpdate(
            membershipId,
            {
                $inc: { 'subscription.entries': 1 },
                $set: { 'isExpired': false }
            },
            { new: true, useFindAndModify: false }
        )


        return NextResponse.json(updatedMembership, { status: 200 });

    } catch (err) {
        console.error('had a problem charge membership', err);
        return NextResponse.json({ message: "had a problem charge membership" }, { status: 500 });
    }
}
