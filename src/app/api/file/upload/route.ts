import formidable from 'formidable'
import fs from 'fs/promises'
import { NextApiHandler, NextApiRequest } from 'next'
import path from 'path'

export const config = {
  api: {
    bodyParser: false
  }
}

const readFile = (req: NextApiRequest, saveLocally?: boolean): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {}
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), '/public/files')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options.filename = (_name, _ext, path, _form) => {
      return path.originalFilename ?? ''
    }
  }
  options.maxFileSize = 4000 * 1024 * 1024
  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

const handler: NextApiHandler = async (req) => {
  try {
    await fs.readdir(path.join(process.cwd() + '/public', '/files'))
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + '/public', '/files'))
  }
  await readFile(req, true)
  return new Response('ok', { status: 200 })
}

export default handler
