import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.Pusher = require('pusher-js'); 
  }, [])
  return <Component {...pageProps} />
}
