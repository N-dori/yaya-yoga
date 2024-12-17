import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
    }
})

const uploadImageToS3 = async (file, fileName) => {
    const fileBuffer = file
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `Announcements-images/${fileName}`,
        Body: fileBuffer,
        ContentType: "Image"
    }
    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    return fileName
}

export async function POST(request) {
    try {

        const formData = await request.formData()
        const file = formData.get('image')
        if (!file) {
            return NextResponse.json({ error: "file is requied" }, { status: 400 })

        }
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = await uploadImageToS3(buffer, file.name)
        revalidatePath('dashboard/create_announcement')
        return NextResponse.json({ success: true, fileName });

    } catch (err) {
        console.error('had a problem uploading', err);
        return NextResponse.json({ message: "had a problem uploading" }, { status: 500 });
    }
}