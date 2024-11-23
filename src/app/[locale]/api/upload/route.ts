import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export const config = {
  runtime: 'edge'
}

export async function POST(req: Request): Promise<NextResponse> {
  const file = req.body || ''
  const fileName = req.headers.get('file-name') || 'fileName'
  const contentType = req.headers.get('content-type') || 'text/plain'

  const res = await put(fileName, file, {
    contentType,
    access: 'public'
    //token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return NextResponse.json(res)
}
