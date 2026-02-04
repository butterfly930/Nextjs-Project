import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {loading && (
        <div className="fixed top-0 w-full bg-blue-500 text-white text-center py-2">
          Loading...
        </div>
      )}
      <Component {...pageProps} />
    </>
  );
}
