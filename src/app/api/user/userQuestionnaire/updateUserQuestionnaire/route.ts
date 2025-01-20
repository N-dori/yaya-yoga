import connectMongoDB from '../../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import UserQuestionnaire from '../../../../models/userQuestionnaire';

export async function PUT(request) {
    try {
        const { _id ,userQuestionnaire} = await request.json();

        await connectMongoDB();

        const updatedUser =  await UserQuestionnaire.findOneAndReplace( 
            { _id}, 
         
                userQuestionnaire ,
        
                { new: true, upsert: true }
        )
        return NextResponse.json(updatedUser, { status: 203 });

    } catch (err) {
        console.error('had a problem updating is new user', err);
        return NextResponse.json({ message: "had a problem updating user" }, { status: 500 });
    }
}