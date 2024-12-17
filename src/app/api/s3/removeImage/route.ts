import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
    }
})

const deleteImageFromS3 = async (fileName:string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `Announcements-images/${fileName}`
    };
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
};

export async function DELETE(request) {
    try {
        const { fileName } = await request.json();
        
        if (!fileName) {
            return NextResponse.json({ error: "File name is required" }, { status: 400 });
        }

      await deleteImageFromS3(fileName);
      revalidatePath('/')
      revalidatePath('/dashboard/create_announcement')
        return NextResponse.json({ success: true, message: "File deleted successfully" });
    } catch (err) {
        console.error('Error deleting file:', err);
        return NextResponse.json({ message: "Error deleting file" }, { status: 500 });
    }
}