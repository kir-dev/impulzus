import { useState } from 'react'
import { Document, Page as ReactPdfPage, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

import { Box, Flex, IconButton } from '@chakra-ui/react'
import { PDFDocumentProxy } from 'pdfjs-dist'
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/'
}

type PDFFile = string | File | null

const Page = React.forwardRef(({ pageNumber }: any, ref: any) => {
  return (
    <div ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} height={750} />
    </div>
  )
})

type Props = {
  path: string
}

export default function PdfRenderer({ path }: Props) {
  const [file, setFile] = useState<PDFFile>(`/files/${path}.pdf`)
  const [numPages, setNumPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages)
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  return (
    <Box className="Example__container__document">
      <Flex mb={2} justify={page <= 1 ? 'flex-end' : 'space-between'}>
        <IconButton children={<FaArrowLeft />} hidden={page <= 1} onClick={() => page > 1 && setPage(page - 1)} aria-label={'Előző'} />
        <IconButton
          children={<FaArrowRight />}
          hidden={page >= numPages}
          onClick={() => page < numPages && setPage(page + 1)}
          aria-label={'Következő'}
        />
      </Flex>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        <Page pageNumber={page} />
      </Document>
    </Box>
  )
}
