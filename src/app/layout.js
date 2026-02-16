export const metadata = {
  title: 'Portal',
  description: 'Portal Demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Portal is a webspace builder for creative people" />
        <meta property="og:title" content="Portal | Design your digital world" />
        <meta property="og:description" content="Portal is a webspace builder for creative people" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/portal-hero.gif" />
        <meta property="og:url" content="https://portal8.space" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portal | Design your digital world" />
        <meta name="twitter:description" content="Portal is a webspace builder for creative people" />
        <meta name="twitter:image" content="/portal-hero.gif" />
      </head>
      <body>{children}</body>
    </html>
  )
} 