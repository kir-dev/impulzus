import * as Minio from 'minio'

// Create a new Minio client with the S3 endpoint, access key, and secret key
export const s3Client = new Minio.Client({
  endPoint: process.env.S3_ENDPOINT || 'localhost',
  port: process.env.S3_PORT ? Number(process.env.S3_PORT) : undefined,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  useSSL: process.env.S3_USE_SSL === 'true'
})
export async function createPresignedUrlToUpload({
  bucketName,
  fileName,
  expiry = 60 * 60
}: {
  bucketName: string
  fileName: string
  expiry?: number
}): Promise<string> {
  try {
    const res = await s3Client.presignedPutObject(bucketName, fileName, expiry)
    return res
  } catch (e) {
    console.error(e)
  }
  return ''
}
