import 'bootstrap/dist/css/bootstrap.min.css';
import '../../public/styles/styles.css';
import Head from 'next/head';

 
// This default export is required in a new `pages/_app.js` file.
export default function Home({ Component, pageProps }) {
  return (
  <>
    <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </>
)}