import connectMongoDB from '../../../libs/mongoDB'
import { NextResponse } from 'next/server'
import Billboard from '../../../models/billboard';

export async function POST () {

   try {
      await connectMongoDB();
  
      // Fetch the most recent document from the Billboard collection
      const billboard = await Billboard.find({}).sort({ _id: -1 }).limit(1);
  
      if (!billboard.length) {
        return NextResponse.json({ message: 'No billboards found' }, { status: 404 });
      }
  
      return NextResponse.json({ billboard: billboard[0] }, { status: 201 });
    } catch (err) {
      console.error('Error finding Billboard:', err);
      return NextResponse.json({ message: 'Had a problem fetching the Billboard data' }, { status: 500 });
    }
  }
