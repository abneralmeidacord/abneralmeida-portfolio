import { useEffect, useImperativeHandle, useRef, useState } from 'react'

let apiPromise

function loadRecaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha)
  if (apiPromise) return apiPromise

  apiPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    let timeout
    const cleanUp = () => {
      clearTimeout(timeout)
      delete window.portfolioRecaptchaReady
    }
    const fail = () => {
      cleanUp()
      script.remove()
      reject(new Error('Unable to load reCAPTCHA'))
    }
    window.portfolioRecaptchaReady = () => {
      cleanUp()
      resolve(window.grecaptcha)
    }
    script.src = 'https://www.google.com/recaptcha/api.js?onload=portfolioRecaptchaReady&render=explicit'
    script.async = true
    script.defer = true
    script.onerror = fail
    timeout = setTimeout(fail, 20000)
    document.head.appendChild(script)
  }).catch(error => {
    apiPromise = undefined
    throw error
  })
  return apiPromise
}

export default function Recaptcha({ ref, siteKey, language, text, onVerified }) {
  const frameRef = useRef(null)
  const hostRef = useRef(null)
  const widgetRef = useRef(null)
  const verificationRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [attempt, setAttempt] = useState(0)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Google's horizontal widget is 304 × 78; scale both dimensions together.
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setScale(entry.contentRect.width / 304)
    })
    observer.observe(frameRef.current)
    return () => observer.disconnect()
  }, [])

  useImperativeHandle(ref, () => ({
    getResponse: () => {
      const verification = verificationRef.current
      if (!verification || Date.now() - verification.time >= 120000 || widgetRef.current === null) return ''
      return window.grecaptcha?.getResponse(widgetRef.current) === verification.token ? verification.token : ''
    },
    reset: () => {
      verificationRef.current = null
      if (widgetRef.current !== null) window.grecaptcha?.reset(widgetRef.current)
    },
  }), [])

  useEffect(() => {
    let disposed = false
    const host = hostRef.current
    // A separate container keeps Google's DOM isolated from React and StrictMode cleanup.
    const container = document.createElement('div')
    host.appendChild(container)
    loadRecaptcha().then(api => {
      if (disposed) return
      widgetRef.current = api.render(container, {
        sitekey: siteKey,
        hl: language === 'pt' ? 'pt-BR' : 'en',
        size: 'normal',
        callback: token => {
          if (disposed) return
          verificationRef.current = { token, time: Date.now() }
          setStatus('ready')
          onVerified()
        },
        'expired-callback': () => {
          if (disposed) return
          verificationRef.current = null
          setStatus('expired')
        },
        'error-callback': () => {
          if (disposed) return
          verificationRef.current = null
          setStatus('error')
        },
      })
      setStatus('ready')
    }).catch(() => { if (!disposed) setStatus('error') })
    return () => {
      disposed = true
      verificationRef.current = null
      if (widgetRef.current !== null) {
        window.grecaptcha?.reset(widgetRef.current)
        widgetRef.current = null
      }
      container.remove()
    }
  }, [siteKey, language, onVerified, attempt])

  return <div className="contact-captcha" role="group" aria-label={text.captchaLabel}>
    <div className="captcha-frame" ref={frameRef} style={{ height: 78 * scale }}>
      <div className="captcha-widget" ref={hostRef} style={{ transform: `scale(${scale})` }} />
    </div>
    <p className="form-note" role="status" aria-live="polite">
      {status === 'loading' ? text.captchaLoading : status === 'error' ? text.captchaError : status === 'expired' ? text.captchaExpired : ''}
    </p>
    {status === 'error' && <button type="button" className="captcha-retry" onClick={() => {
      setStatus('loading')
      setAttempt(value => value + 1)
    }}>{text.captchaRetry}</button>}
  </div>
}
