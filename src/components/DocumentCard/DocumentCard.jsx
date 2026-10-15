import { lazy, Suspense, useState } from 'react'
import { FiEye, FiDownload, FiFileText } from 'react-icons/fi'
import Reveal from '../Motion/Reveal.jsx'
import './DocumentCard.css'

const PdfViewer = lazy(() => import('../PdfViewer/PdfViewer.jsx'))

export default function DocumentCard({ title, description, badge, file, text, readLabel }) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const url = file ? (/^https?:\/\//i.test(file) ? file : import.meta.env.BASE_URL + file.replace(/^\/+/, '')) : null

  return <Reveal as="article" className="document-card">
    <div className="document-card-top">
      <span className="document-icon" aria-hidden="true"><FiFileText /></span>
      <span className="document-badge">{badge || 'PDF'}</span>
    </div>
    <h3>{title}</h3>
    <p className="document-description">{description}</p>
    {url ? <div className="document-actions">
      <button type="button" className="button" onClick={() => setViewerOpen(true)} aria-haspopup="dialog" aria-label={`${readLabel}: ${title}`}>
        {readLabel}<FiEye aria-hidden="true" />
      </button>
      <a className="document-download" href={url} download aria-label={`${text.downloadLetter}: ${title}`}>
        <FiDownload aria-hidden="true" />{text.downloadLetter}
      </a>
    </div> : <div className="document-pending">
      <span>{text.documentPending}</span>
      <p>{text.documentPendingNote}</p>
    </div>}
    {viewerOpen && <Suspense fallback={<p role="status">{text.pdfLoading}</p>}>
      <PdfViewer title={title} file={url} text={text} onClose={() => setViewerOpen(false)} />
    </Suspense>}
  </Reveal>
}
