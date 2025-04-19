import { createPresignedUrlToUpload } from '@/util/files/s3-file-management'
import { nanoid } from 'nanoid'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/authOptions'

export const config = {
  runtime: 'edge'
}

export async function GET(req: Request): Promise<NextResponse> {
  const session = await getServerSession(authOptions)
  if (!session?.user?.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const bucketName = process.env.S3_BUCKET_NAME

  if (!bucketName) {
    return NextResponse.json({ error: 'Bucket name is not defined' }, { status: 400 })
  }

  const fileName = nanoid(16).concat('.pdf')
  const url = await createPresignedUrlToUpload({
    bucketName,
    fileName
  })

  return NextResponse.json({
    url,
    fileName
  })
}
