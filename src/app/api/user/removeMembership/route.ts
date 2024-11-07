import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import User from '../../../models/user';

export async function PUT(request) {
    try {
        const { userId } = await request.json();

        await connectMongoDB();
   
                const updatedMembership = await User.findByIdAndUpdate(
                    userId,
                    { $pop: { 'memberships': -1 } },
                    { new: true, useFindAndModify: false }
                );
            
    
        return NextResponse.json(updatedMembership, { status: 203 });

    } catch (err) {
        console.error('had a problem removing membership', err);
        return NextResponse.json({ message: "had a problem removing membership" }, { status: 500 });
    }
}