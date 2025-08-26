import './globals.css'

export const metadata = {
  title: 'Vue Digital - Portfolio',
  description: 'Results-first portfolio by Gilles Elliott',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
