import Head from 'next/head';
import '../index.css';


export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <title>chat.app</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossOrigin="anonymous" />
    </Head>
    <Component {...pageProps} />
  </>
}
