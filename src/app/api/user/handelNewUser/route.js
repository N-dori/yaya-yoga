import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import User from '../../../models/user';

export async function PUT(request) {
    try {
        const { _id } = await request.json();

        await connectMongoDB();

        const updatedUser =  await User.findByIdAndUpdate(_id, { isNewUser: false })
    
        return NextResponse.json(updatedUser, { status: 203 });

    } catch (err) {
        console.error('had a problem updating is new user', err);
        return NextResponse.json({ message: "had a problem updating user" }, { status: 500 });
    }
}