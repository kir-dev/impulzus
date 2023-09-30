import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log(res)
  switch (req.method) {
    //case 'GET':
    //  return handleGET(res)

    default:
      throw new Error(`The HTTP ${req.method} method is not supported at this route.`)
  }
}

/*const handleGET = async (res: NextApiResponse<any>) => {
  //const filePath = path.join(process.cwd(), 'public', 'mydocument.pdf')
  //await fs.readFile(path.join(process.cwd(), `/public/files/${oldFileName}`))
}*/
