export const uploadToS3 = async (presignedUrl: string, file: File) => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Access-Control-Allow-Origin': '*'
    }
  })
  return response
}
