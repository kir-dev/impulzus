import { useEffect, useState } from 'react'
import { Document, Page as ReactPdfPage, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

import { Box, Flex, IconButton, useMediaQuery } from '@chakra-ui/react'
import { PDFDocumentProxy } from 'pdfjs-dist'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/'
}

type Props = {
  fileURL: string
}

export default function PdfRenderer({ fileURL }: Props) {
  const [numPages, setNumPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const [file, setFile] = useState<File>()
  const bigScreen = useMediaQuery('(min-width: 1300px)')

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages)
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  useEffect(() => {
    const fetchAndSetFile = async () => {
      try {
        const response = await fetch(fileURL)
        if (!response.ok) {
          throw new Error('Failed to fetch blob data')
        }

        const blobData = await response.blob()
        const file = new File([blobData], 'fileName', { type: blobData.type })
        setFile(file)
      } catch (error) {
        console.error('Error fetching blob data:', error)
      }
    }

    fetchAndSetFile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box>
      <Flex mb={2} justify={page <= 1 ? 'flex-end' : 'space-between'}>
        <IconButton hidden={page <= 1} onClick={() => page > 1 && setPage(page - 1)} aria-label={'Előző'}>
          <FaArrowLeft />
        </IconButton>
        <IconButton hidden={page >= numPages} onClick={() => page < numPages && setPage(page + 1)} aria-label={'Következő'}>
          <FaArrowRight />
        </IconButton>
      </Flex>

      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        <ReactPdfPage pageNumber={page} height={bigScreen[0] ? 750 : 250} />
      </Document>
    </Box>
  )
}
