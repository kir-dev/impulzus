import { Document, Page, pdfjs } from 'react-pdf'

export default function Book() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
  return (
    <Document file="./sample.pdf">
      <Page pageNumber={1} />
    </Document>
  )
  /*const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  //pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js'

  return (
    <>
      <Document file="/files/impulzus_cikk.pdf"></Document>
    </>
  )

  /*const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }
  //https://react-reader.metabits.no/files/alice.epub

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

  const width = 400
  const height = 424

  const Page = React.forwardRef(({ pageNumber }, ref) => {
    return (
      <div ref={ref}>
        <ReactPdfPage pageNumber={pageNumber} width={width} />
      </div>
    )
  })

  /*return (
    <Document file="/files/impulzus_cikk.pdf">
      <HTMLFlipBook width={width} height={height}>
        <Page pageNumber={1} />
        <Page pageNumber={2} />
      </HTMLFlipBook>
    </Document>
  )

  return (
    <div style={{ height: '100vh' }}>
      <ReactReader location={location} locationChanged={locationChanged} url="http://localhost:3000/files/4.epub" />
    </div>
  )*/
}
