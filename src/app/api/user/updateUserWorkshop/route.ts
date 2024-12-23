import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import User from '../../../models/user';
import { Tuser } from '@/app/types/types';

export async function PUT(request) {
  try {
    const { _id, membershipId} = await request.json();

    await connectMongoDB();

    // Update the user's memberships array
  
    let user:Tuser = await User.findByIdAndUpdate(
        { _id },
        { $push:
           { worshopTickets: membershipId } 
          },
        { new: true }
      );

  

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Had a problem updating user:", err);
    return NextResponse.json({ message: "Had a problem updating user" }, { status: 500 });
  }
}