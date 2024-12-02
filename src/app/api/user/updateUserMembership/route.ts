import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import User from '../../../models/user';
import mongoose from 'mongoose';
import { Tuser } from '@/app/types/types';

export async function PUT(request) {
  try {
    const { _id, membershipId ,wasMembershipJustPurchesed} = await request.json();

    await connectMongoDB();
    let user:Tuser
    // Update the user's memberships array
    if(wasMembershipJustPurchesed){
     user = await User.findByIdAndUpdate(
        { _id },
        { $push:
           { memberships: membershipId } 
          },
        { new: true }
      );
    }
    else{
       user = await User.findByIdAndUpdate(
        { _id },
        { 
          $push: { 
            memberships: { $each: [membershipId], $position: 0 } 
          } 
        },
        { new: true }
      );
    }


    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Had a problem updating user:", err);
    return NextResponse.json({ message: "Had a problem updating user" }, { status: 500 });
  }
}