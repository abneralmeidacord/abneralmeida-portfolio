import { useState } from 'react'
import emailjs from '@emailjs/browser'
import SocialLinks from '../SocialLinks/SocialLinks.jsx'
import contactPhoto from '../../assets/images/abner-contact.png'
import './Contact.css'
export default function Contact({ text }) {
  const [status, setStatus] = useState('idle')
  const configured = Boolean(import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  async function handleSubmit(event) {
    event.preventDefault()
    if (!configured) { setStatus('unconfigured'); return }
    const form = event.currentTarget
    setStatus('sending')
    try {
      await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form, { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY })
      setStatus('sent')
      form.reset()
    } catch { setStatus('error') }
  }
  const messages = { sent: text.sent, error: text.error, unconfigured: text.notConfigured }
  return <section id="contato" className="section container contact">
    <div className="contact-main">
      <div className="contact-intro">
        <h2>{text.contactHeading}</h2><p className="contact-signature">Abner Almeida</p>
        <div className="contact-details">
          <SocialLinks />
          <div className="contact-form-section">
            <form className="contact-form" aria-labelledby="contact-invitation" onSubmit={handleSubmit}>
              <h3 id="contact-invitation" className="contact-invitation">{text.contactTitle}</h3>
              <label className="visually-hidden" htmlFor="contact-name">{text.contactName}</label>
              <input id="contact-name" name="from_name" placeholder={text.contactName} autoComplete="name" required maxLength={100} />
              <label className="visually-hidden" htmlFor="contact-email">{text.contactEmail}</label>
              <input id="contact-email" name="from_email" placeholder={text.contactEmail} type="email" autoComplete="email" required maxLength={254} />
              <label className="visually-hidden" htmlFor="contact-subject">{text.contactSubject}</label>
              <input id="contact-subject" name="subject" placeholder={text.contactSubject} maxLength={150} />
              <label className="visually-hidden" htmlFor="contact-message">{text.contactMessage}</label>
              <textarea id="contact-message" name="message" placeholder={text.contactMessage} required minLength={10} maxLength={3000} rows={5} />
              <button className="button" disabled={status === 'sending'}>{status === 'sending' ? text.sending : text.send}</button>
              {!configured && status !== 'unconfigured' && <p className="form-note">{text.notConfigured}</p>}
              <p className={'form-status ' + (status === 'error' ? 'form-error' : '')} role="status" aria-live="polite">{messages[status] || ''}</p>
            </form>
          </div>
        </div>
      </div>
      <img className="contact-photo" src={contactPhoto} alt="Abner Almeida em uma viagem" loading="lazy" width="600" height="800" />
    </div>
  </section>
}
