// import '../styles/globals.css'

import Navbar from "./Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head><title>Jubayer</title></head>
      <body>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}
