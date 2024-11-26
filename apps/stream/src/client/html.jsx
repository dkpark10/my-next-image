export default function Html({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>stream-ssr</title>
      </head>
      <body>
        {children}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `assetManifest = ${JSON.stringify(assets)};`
          }}
        /> */}
      </body>
    </html>
  );
}
