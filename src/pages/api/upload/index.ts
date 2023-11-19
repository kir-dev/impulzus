import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge'
}

export default async function POST(req: Request): Promise<NextResponse> {
  const file = req.body || ''
  const contentType = req.headers.get('content-type') || 'text/plain'
  const filename = req.headers.get('file-name') || 'fileName'

  const blob = await put(filename, file, {
    contentType,
    //token: process.env.BLOB_READ_WRITE_TOKEN,
    access: 'public'
  })

  console.log('BLOB------------------')
  console.log(blob)

  return NextResponse.json(blob)
}
