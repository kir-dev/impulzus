import React, { useRef, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { Document, Page as ReactPdfPage, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const width = 250
const height = 500

const Page = React.forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} width={1000} />
    </div>
  )
})

export function Book3() {
  const flipBookRef = useRef(null)
  const [numPages, setNumPages] = useState(1)

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  return (
    <>
      <Document
        renderTextLayer={false}
        renderAnnotationLayer={false}
        file={'/files/impulzus_cikk.pdf'}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <HTMLFlipBook width={1000} height={750}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index}`} pageNumber={index} />
          ))}
        </HTMLFlipBook>
      </Document>
    </>
  )
}
