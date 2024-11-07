import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import Membership from '../../../models/membership';
import { Tmembership } from '@/app/types/types';

export async function PUT(request) {
    try {
        const { membershipId} = await request.json();

        await connectMongoDB();

        // Find the membershipId document
        console.log('membershipId', membershipId);
   
                const updatedMembership:Tmembership = await Membership.findByIdAndUpdate(
                    membershipId,
                    { $inc: { 'subscription.entries': -1 } },
                    { new: true, useFindAndModify: false }
                );
                if(+updatedMembership.subscription.entries <= 0){
                    const expiredMembership:Tmembership = await Membership.findByIdAndUpdate(
                        membershipId,
                        { $set: { 'isExpired': true } },
                        { new: true, useFindAndModify: false }
                    );
                    return NextResponse.json(expiredMembership, { status: 203 });
                }
    
        return NextResponse.json(updatedMembership, { status: 203 });

    } catch (err) {
        console.error('had a problem charge membership', err);
        return NextResponse.json({ message: "had a problem charge membership" }, { status: 500 });
    }
}