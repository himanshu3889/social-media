import "../styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import ProtectedRoute from "../utils/ProtectedRoutes";

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setIsSSR] = useState(true);
  const router = useRouter()

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;
  return (
    <>
      <Head>
        <title>Social Media</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v6.1.1/css/all.css"
          integrity="sha384-/frq1SRXYH/bSyou/HUp/hib7RVN1TawQYja658FEOodR/FQBKVqT9Ol+Oz3Olq5"
          crossOrigin="anonymous"
        />
      </Head>

      <GoogleOAuthProvider
        clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
      >
        <ProtectedRoute router={router}>
          <div className="overflow-hidden h-[100vh] ">
            <Navbar />
            <div className="overflow-hidden">
              <Component {...pageProps} />
            </div>
          </div>
        </ProtectedRoute>
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
