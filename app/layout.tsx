import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Vue Digital Portfolio</title>
      </head>
      <body>{children}</body>
    </html>
  )
}
