import { createPresignedUrlToUpload } from '@/util/files/s3-file-management'
import { nanoid } from 'nanoid'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/authOptions'

export const config = {
  runtime: 'edge'
}

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.json()
  const { type } = body
  if (type !== 'pdf' && type !== 'jpg' && type !== 'png' && type !== 'jpeg' && type !== 'webp') {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
  }
  const session = await getServerSession(authOptions)
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const bucketName = process.env.S3_BUCKET_NAME

  if (!bucketName) {
    return NextResponse.json({ error: 'Bucket name is not defined' }, { status: 400 })
  }

  const fileName = nanoid(16).concat('.' + type)
  const url = await createPresignedUrlToUpload({
    bucketName,
    fileName
  })

  return NextResponse.json({
    url,
    fileName
  })
}
