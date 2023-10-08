import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

/*export const config = {
  api: {
    bodyParser: false
  }
}*/

/*export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const body = request.body as HandleUploadBody
  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      onBeforeGenerateToken: async (
        pathname: string
        // clientPayload?: string,
      ) => {
        // Generate a client token for the browser to upload the file

        // ⚠️ Authenticate users before generating the token.
        // Otherwise, you're allowing anonymous uploads.
        //const { user } = await auth(request)
        /const userCanUpload = canUpload(user, pathname)
        if (!userCanUpload) {
          throw new Error('Not authorized')
        }/
        console.log('lefut?')
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            userId: 'user.id'
          })
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified of client upload completion
        // ⚠️ This will not work on `localhost` websites,
        // Use ngrok or similar to get the full upload flow

        console.log('blob upload completed', blob, tokenPayload)

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user')
        }
      }
    })
    console.log('XXXXXXDDDDDDDDDD')
    return response.status(200).json(jsonResponse)
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    return response.status(400).json({ error: (error as Error).message })
  }
}*/

export async function POST(req: Request): Promise<NextResponse> {
  const file = req.body || ''
  const contentType = req.headers.get('content-type') || 'text/plain'
  const filename = 'fileName'

  const blob = await put(filename, file, {
    contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN,
    access: 'public'
  })

  return NextResponse.json(blob)
}
