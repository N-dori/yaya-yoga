import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import User from '../../../models/user';

export async function PUT(request) {
    try {
        const { _id} = await request.json();

        await connectMongoDB();

        const updatedUser= await User.findOneAndUpdate(
            { _id},    
            { $set: { "isNewUser":false}}, 
            { new: true }
        )
    
        return NextResponse.json(updatedUser, { status: 200 });

    } catch (err) {
        console.error('had a problem updating user', err);
        return NextResponse.json({ message: "had a problem updating user" }, { status: 500 });
    }
}