import { useState } from 'react'
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
  path: string
}

export default function PdfRenderer({ path }: Props) {
  const [numPages, setNumPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)
  const bigScreen = useMediaQuery('(min-width: 1300px)')

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages)
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  return (
    <Box className="Example__container__document">
      <Flex mb={2} justify={page <= 1 ? 'flex-end' : 'space-between'}>
        <IconButton hidden={page <= 1} onClick={() => page > 1 && setPage(page - 1)} aria-label={'Előző'}>
          <FaArrowLeft />
        </IconButton>
        <IconButton hidden={page >= numPages} onClick={() => page < numPages && setPage(page + 1)} aria-label={'Következő'}>
          <FaArrowRight />
        </IconButton>
      </Flex>

      <Document file={`/files/${path}.pdf`} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        <ReactPdfPage pageNumber={page} height={bigScreen[0] ? 750 : 250} />
      </Document>
    </Box>
  )
}
