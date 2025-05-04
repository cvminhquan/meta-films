'use client'
import NextTopLoader from 'nextjs-toploader'

export default function NextTopLoaderClient() {
  return (
    <NextTopLoader
      color="linear-gradient(to top left, #6366f1, #d946ef)"
      initialPosition={0.08}
      crawlSpeed={200}
      height={5}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
    />
  );
}
