'use client'
import NextTopLoader from 'nextjs-toploader'

export default function NextTopLoaderClient() {
  return (
    <NextTopLoader
      color='linear-gradient(230.31deg, #08FFFF 0.16%, #007AFF 92.45%)'
      initialPosition={0.08}
      crawlSpeed={200}
      height={5}
      crawl={true}
      showSpinner={false}
      easing='ease'
      speed={200}
    />
  )
}
