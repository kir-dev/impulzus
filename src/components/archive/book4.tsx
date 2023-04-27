import { useState } from 'react'
import PageFlip from 'react-pageflip'
import { Page } from 'react-pdf'

const MyPdfViewer = () => {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }

  const handlePageNumberChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }

  return (
    <div className="pdf-viewer">
      <PageFlip flipOnTouch={true} showHint={true} maxShadowOpacity={0.5} onFlip={handlePageNumberChange}>
        {Array.from(new Array(numPages), (el, index) => (
          <div key={index} className="page-container">
            <Page className="pdf-page" pageNumber={index + 1} onLoadSuccess={handleDocumentLoadSuccess} />
          </div>
        ))}
      </PageFlip>
    </div>
  )
}
