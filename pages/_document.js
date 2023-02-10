import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="ChatTBH" key="title"/>
        <meta property="og:description" content="Up your game on Tinder, Hinge and Bumble" key="description"/>
        <meta
          property="og:image"
          content="../assets/image.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
