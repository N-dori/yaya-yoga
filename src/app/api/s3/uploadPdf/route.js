import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';


const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
    }
})

const uploadPdfToS3 = async (file, fileName) => {
    const fileBuffer = file
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `Health_Declerations/${fileName}`,
        Body: fileBuffer,
        ContentType: "Pdf"
    }
    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    return fileName
}

export async function POST(request) {
    try {

        const formData = await request.formData()
        const file = formData.get('file')
        if (!file) {
            return NextResponse.json({ error: "file is requied" }, { status: 400 })

        }
        const buffer = Buffer.from(await file.arrayBuffer())
        const fileName = await uploadPdfToS3(buffer, file.name)

        return NextResponse.json({ success: true, fileName });

    } catch (err) {
        console.error('had a problem uploading', err);
        return NextResponse.json({ message: "had a problem uploading" }, { status: 500 });
    }
}