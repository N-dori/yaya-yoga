import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Billboard from '../../../models/billboard';

export async function PUT (request) {

   try {
    const { _id } = await request.json();

      await connectMongoDB();

const res=  await Billboard.updateOne(
        { _id },
        { $set: { "announcements": [] } },
    );

  
        return NextResponse.json({ message: 'billboard was removed' }, { status: 200 });
      
  
    } catch (err) {
      console.error('Error removing Billboard:', err);
      return NextResponse.json({ message: 'Had a problem removing  Billboard' }, { status: 500 });
    }
  }
