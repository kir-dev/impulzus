import React from 'react'
import HTMLFlipBook from 'react-pageflip'
import { Document, pdfjs, Page as ReactPdfPage } from 'react-pdf'

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref} data-density={props.density | 'soft'}>
      <div className="page-content">
        <h2 className="page-header">Page header - {props.number}</h2>
        <div className="page-image" style={{}}></div>
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  )
})

const Page2 = React.forwardRef(({ pageNumber }, ref) => {
  return (
    <div ref={ref}>
      <ReactPdfPage pageNumber={pageNumber} width={500} />
    </div>
  )
})

export default class Book2 extends React.Component {
  constructor(props) {
    super(props)

    const pages = []

    /*let pageNum = 0
    for (let i = 0; i < 100; i++) {
      pageNum++
      pages.push(
        <Page key={i + 1} number={i + 1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis nibh, non convallis ex convallis eu. Suspendisse
          potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse rutrum, augue ac sollicitudin mollis, eros velit
          viverra metus, a venenatis tellus tellus id magna. Aliquam ac nulla rhoncus, accumsan eros sed, viverra enim. Pellentesque non
          justo vel nibh sollicitudin pharetra suscipit ut ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus mollis
          nibh, non convallis ex convallis eu. Suspendisse potenti. Aenean vitae pellentesque erat. Integer non tristique quam. Suspendisse
          rutrum, augue ac sollicitudin mollis, eros velit viverra metus, a venenatis tellus tellus id magna.
        </Page>
      )
    }*/

    this.state = {
      page: 0,
      totalPage: 0,
      orientation: 'landscape',
      state: 'read',
      pages: pages
    }
  }

  nextButtonClick = () => {
    this.flipBook.pageFlip().flipNext()
  }

  prevButtonClick = () => {
    this.flipBook.pageFlip().flipPrev()
  }

  onPage = (e) => {
    this.setState({
      page: e.data
    })
  }

  onChangeOrientation = (e) => {
    this.setState({
      orientation: e.data
    })
  }

  onChangeState = (e) => {
    this.setState({
      state: e.data
    })
  }

  componentDidMount() {
    this.setState({
      totalPage: 20
    })
  }

  render() {
    let numPages = 0

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
      numPages = nextNumPages
    }

    const options = {
      cMapUrl: 'cmaps/',
      standardFontDataUrl: 'standard_fonts/'
    }

    Array.from(new Array(numPages), (el, index) => pages.push(<Page2 key={`page_${index + 1}`} pageNumber={index + 1} />))

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

    return (
      <div>
        <Document file={'/files/impulzus_cikk.pdf'} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          <HTMLFlipBook
            width={500}
            height={500}
            size="stretch"
            minWidth={115}
            maxWidth={500}
            minHeight={100}
            maxHeight={500}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={this.onPage}
            onChangeOrientation={this.onChangeOrientation}
            onChangeState={this.onChangeState}
            className="flip-book html-book demo-book"
            style={{}}
            ref={(el) => (this.flipBook = el)}
          >
            {this.state.pages}
          </HTMLFlipBook>
        </Document>

        <div className="container mt-3">
          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-info btn-sm btn-prev" onClick={this.prevButtonClick}>
                Previous page
              </button>
              [<span>{this.state.page + 1}</span> of <span>{this.state.totalPage}</span>]
              <button type="button" className="btn btn-info btn-sm btn-next" onClick={this.nextButtonClick}>
                Next page
              </button>
            </div>
            <div className="col-md-6">
              State: <i>{this.state.state}</i>, orientation: <i>{this.state.orientation}</i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
