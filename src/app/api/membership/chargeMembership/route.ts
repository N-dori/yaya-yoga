import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import Membership from '../../../models/membership';
import { Tmembership } from '@/app/types/types';

export async function PUT(request) {
    try {
        const { membershipId } = await request.json();
        await connectMongoDB();

        // subtract subscription by 1  

        const updatedMembership: Tmembership = await Membership.findByIdAndUpdate(
            membershipId,
            { $inc: { 'subscription.entries': -1 } },
            { new: true, useFindAndModify: false }
        )
        // a new membership is born with no expiry date  = if no starting expiry date ?
        // we set expiry date of six month or one mounth 

        if (!updatedMembership?.start) {
            const today = Date.now()
            let sixMonth = new Date(today)
            let oneMonth = new Date (today)
            console.log('updatedMembership?.subscription?.type',updatedMembership);
            
            const ismonthlyPass:boolean = updatedMembership?.subscription?.type === 'חופשי חודשי' 
            sixMonth.setMonth(sixMonth.getMonth() + 6);
            oneMonth.setMonth(oneMonth.getMonth() + 1);
            await Membership.findByIdAndUpdate(
                membershipId,
                { $set: { 'start': today, 'end':ismonthlyPass? oneMonth : sixMonth } },
            );
        }
        // chack if after subtruction entries is 0 if yes membership is expiered 

        if (+updatedMembership.subscription.entries <= 0) {
         const expiredMembership: Tmembership = await Membership.findByIdAndUpdate(
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
