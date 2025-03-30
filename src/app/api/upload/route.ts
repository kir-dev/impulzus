import { createPresignedUrlToUpload } from '@/util/files/s3-file-management'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge'
}

export async function POST(req: Request): Promise<NextResponse> {
  const origFileName = req.headers.get('file-name') || 'fileName'
  const bucketName = process.env.S3_BUCKET_NAME

  if (!bucketName) {
    return NextResponse.json({ error: 'Bucket name is not defined' }, { status: 400 })
  }

  const fileName = `${nanoid(5)}-${origFileName}`
  const url = await createPresignedUrlToUpload({
    bucketName,
    fileName
  })

  return NextResponse.json({
    url,
    fileName
  })
}