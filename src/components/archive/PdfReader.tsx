import { useState } from 'react'
import { Document, Page as ReactPdfPage, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

import { Button } from '@chakra-ui/react'
import { PDFDocumentProxy } from 'pdfjs-dist'
import React from 'react'

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

export default function PdfRenderer() {
  const [file, setFile] = useState<PDFFile>('/files/impulzus_cikk.pdf')
  const [numPages, setNumPages] = useState<number>(1)
  const [page, setPage] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy) {
    setNumPages(nextNumPages)
  }

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

  return (
    <div className="Example__container__document">
      <Button onClick={() => page > 1 && setPage(page - 1)}>Előző</Button>
      <Button onClick={() => page < numPages && setPage(page + 1)}>Következő</Button>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
        <Page pageNumber={page} />
      </Document>
    </div>
  )
}
