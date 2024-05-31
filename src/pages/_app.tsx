import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "@/styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
