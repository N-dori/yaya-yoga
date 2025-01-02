import connectMongoDB from '../../../libs/mongoDB';
import { NextResponse } from 'next/server';
import User from '../../../models/user';

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate payload
    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Invalid email provided' }, { status: 400 });
    }

    const { email } = body;

    // Connect to MongoDB
    await connectMongoDB();

    // Find user by email
    const user = await User.findOne({ email });

    if (user) {
      const response = { _id: user._id, isNewUser: user.isNewUser };
      return NextResponse.json(response, { status: 200 }); // Return 200 for successful retrieval
    } else {
      return NextResponse.json(null, { status: 404 }); // Return 404 for user not found
    }
  } catch (err) {
    console.error('Error finding user:', err.message);

    // Return error response with status 500
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
