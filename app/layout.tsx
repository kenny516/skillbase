import './globals.css'

export const metadata = {
  title: 'Skillbase',
  description: 'AI skill builder',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
