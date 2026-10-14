import { useEffect, useId, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiDownload, FiMinus, FiPlus, FiX } from 'react-icons/fi'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import './PdfViewer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

const pdfOptions = {
  cMapUrl: `${import.meta.env.BASE_URL}pdfjs/cmaps/`,
  standardFontDataUrl: `${import.meta.env.BASE_URL}pdfjs/standard_fonts/`,
  wasmUrl: `${import.meta.env.BASE_URL}pdfjs/wasm/`,
}

export default function PdfViewer({ title, file, text, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const documentRef = useRef(null)
  const titleId = useId()
  const [numPages, setNumPages] = useState(0)
  const [pageNumber, setPageNumber] = useState(1)
  const [zoom, setZoom] = useState(1)
  const [pageWidth, setPageWidth] = useState(600)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    closeButtonRef.current.focus()
    document.body.style.overflow = 'hidden'
    const observer = new ResizeObserver(entries => {
      setPageWidth(Math.max(160, Math.min(900, entries[0].contentRect.width)))
    })
    observer.observe(documentRef.current)
    return () => {
      observer.disconnect()
      if (dialog.open) dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  function closeOnBackdrop(event) {
    if (event.target !== dialogRef.current) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialogRef.current.close()
    }
  }

  function retry() {
    setNumPages(0)
    setPageNumber(1)
    setAttempt(value => value + 1)
  }

  function changePage(number) {
    setPageNumber(number)
    documentRef.current.scrollTo({ top: 0, left: 0 })
  }

  const loading = <p className="pdf-viewer-message" role="status">{text.pdfLoading}</p>
  const error = <div className="pdf-viewer-fallback" role="alert">
    <p>{text.pdfViewerUnavailable}</p>
    <button type="button" className="button" onClick={retry}>{text.pdfRetry}</button>
    <a className="document-download" href={file} download>{text.downloadLetter}</a>
  </div>

  return <dialog ref={dialogRef} className="pdf-viewer" aria-labelledby={titleId}
    onClose={event => {
      // O StrictMode reabre o diálogo antes de entregar o evento da limpeza inicial.
      if (!event.currentTarget.open) onClose()
    }} onClick={closeOnBackdrop}>
    <div className="pdf-viewer-content">
      <header className="pdf-viewer-toolbar">
        <div className="pdf-viewer-heading">
          <p>{text.pdfViewerTitle}</p>
          <h2 id={titleId}>{title}</h2>
        </div>
        <div className="pdf-viewer-actions">
          <a className="document-download" href={file} download aria-label={`${text.downloadLetter}: ${title}`}>
            <FiDownload aria-hidden="true" /><span>{text.downloadLetter}</span>
          </a>
          <button ref={closeButtonRef} type="button" className="pdf-viewer-close" aria-label={text.closePdfViewer}
            onClick={() => dialogRef.current.close()}>
            <FiX aria-hidden="true" />
          </button>
        </div>
      </header>
      <div className="pdf-viewer-controls" role="group" aria-label={text.pdfControls}>
        <div className="pdf-viewer-page-controls">
          <button type="button" aria-label={text.pdfPreviousPage} disabled={pageNumber <= 1 || !numPages}
            onClick={() => changePage(pageNumber - 1)}><FiChevronLeft aria-hidden="true" /></button>
          <span aria-live="polite">{text.pdfPage} {numPages ? pageNumber : '–'} {text.pdfOf} {numPages || '–'}</span>
          <button type="button" aria-label={text.pdfNextPage} disabled={!numPages || pageNumber >= numPages}
            onClick={() => changePage(pageNumber + 1)}><FiChevronRight aria-hidden="true" /></button>
        </div>
        <div className="pdf-viewer-zoom-controls">
          <button type="button" aria-label={text.pdfZoomOut} disabled={!numPages || zoom <= 0.75}
            onClick={() => setZoom(value => Math.max(0.75, value - 0.25))}><FiMinus aria-hidden="true" /></button>
          <button type="button" className="pdf-viewer-fit" aria-label={text.pdfFitWidth} disabled={!numPages}
            onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</button>
          <button type="button" aria-label={text.pdfZoomIn} disabled={!numPages || zoom >= 2}
            onClick={() => setZoom(value => Math.min(2, value + 0.25))}><FiPlus aria-hidden="true" /></button>
        </div>
      </div>
      <div ref={documentRef} className="pdf-viewer-document">
        <Document key={attempt} file={file} options={pdfOptions} loading={loading} error={error} noData={error}
          onLoadSuccess={({ numPages: count }) => setNumPages(count)}>
          <Page pageNumber={pageNumber} width={pageWidth} scale={zoom} loading={loading} error={error} />
        </Document>
      </div>
    </div>
  </dialog>
}
