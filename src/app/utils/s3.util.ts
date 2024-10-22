import aws from 'aws-sdk'
const region='eu-north-1'
const bucketName='YAYA_YOGA'
const accessKeyId=process.env.AWS_ACCESS_KEY
const secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY
const signatureVersion='v4'
export const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion,
})

export const generateUploadURL = async(UserId:string)=> {

const params = ({
    Bucket: bucketName,
    Key: `${UserId}.pdf`,  // Name the file properly (including .pdf extension)
    Expires: 60,  // URL expiration time
    ContentType: 'application/pdf'  // Ensure the correct content type
})
 const uploadURL = await s3.getSignedUrlPromise('putObject',params)
 return uploadURL
}