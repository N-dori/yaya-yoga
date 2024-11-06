import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import User from '../../../models/user';
import mongoose from 'mongoose';

export async function PUT(request) {
  try {
    const { _id, membershipId } = await request.json();

    await connectMongoDB();

    // Update the user's memberships array
    const result = await User.updateOne(
      { _id },
      { $push: { memberships: membershipId } }
    );

    // Log and inspect the result
    console.log("Update result:", result);



    return NextResponse.json({ message: "User's membership was added" }, { status: 200 });
  } catch (err) {
    console.error("Had a problem updating user:", err);
    return NextResponse.json({ message: "Had a problem updating user" }, { status: 500 });
  }
}