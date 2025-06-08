import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div>
            <Head>
              <link rel="icon" type="image/png" href="/favicon.png" />
            </Head> 
          <Component {...pageProps} />
    </div>);
}
