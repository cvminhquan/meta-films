// src/libs/metadata.ts
import {
    NEXT_PUBLIC_SITE_DESCRIPTION,
    NEXT_PUBLIC_SITE_NAME,
    NEXT_PUBLIC_SITE_URL
} from "@/constanst/env";
import { Metadata } from "next";

// Default metadata configuration
export const defaultMetadata: Metadata = {
  title: {
    default: NEXT_PUBLIC_SITE_NAME,
    template: `%s | ${NEXT_PUBLIC_SITE_NAME}`,
  },
  description: NEXT_PUBLIC_SITE_DESCRIPTION,
  keywords: [
    "phim online",
    "xem phim",
    "phim hay",
    "phim mới",
    "phim HD",
    "phim vietsub",
    "phim thuyết minh",
    "phim chiếu rạp",
    "phim bộ",
    "phim lẻ",
    "meta films",
  ],
  authors: [{ name: "Meta Films Team" }],
  creator: "Meta Films",
  publisher: "Meta Films",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(NEXT_PUBLIC_SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: NEXT_PUBLIC_SITE_URL,
    siteName: NEXT_PUBLIC_SITE_NAME,
    title: NEXT_PUBLIC_SITE_NAME,
    description: NEXT_PUBLIC_SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: NEXT_PUBLIC_SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: NEXT_PUBLIC_SITE_NAME,
    description: NEXT_PUBLIC_SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@metafilms",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

// Generate metadata for movie pages
export function generateMovieMetadata(movie: {
  name: string;
  slug: string;
  content?: string;
  poster_url?: string;
  thumb_url?: string;
  year?: number;
  category?: { name: string }[];
  country?: { name: string }[];
}): Metadata {
  const title = `${movie.name} (${movie.year || "N/A"})`;
  const description = movie.content 
    ? movie.content.replace(/<[^>]*>/g, "").substring(0, 160) + "..."
    : `Xem phim ${movie.name} ${movie.year ? `năm ${movie.year}` : ""} chất lượng HD miễn phí tại ${NEXT_PUBLIC_SITE_NAME}`;
  
  const imageUrl = movie.poster_url || movie.thumb_url || "/default-movie-poster.jpg";
  const movieUrl = `${NEXT_PUBLIC_SITE_URL}/phim/${movie.slug}`;
  
  const genres = movie.category?.map(cat => cat.name).join(", ") || "";
  const countries = movie.country?.map(country => country.name).join(", ") || "";
  
  const keywords = [
    movie.name,
    `phim ${movie.name}`,
    `xem phim ${movie.name}`,
    movie.year ? `phim ${movie.year}` : "",
    ...genres.split(", ").filter(Boolean),
    ...countries.split(", ").filter(Boolean),
    "phim HD",
    "phim vietsub",
    "xem phim online",
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `/phim/${movie.slug}`,
    },
    openGraph: {
      type: "video.movie",
      url: movieUrl,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 500,
          height: 750,
          alt: movie.name,
        },
      ],
      siteName: NEXT_PUBLIC_SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    other: {
      ...(movie.year && { "movie:release_date": `${movie.year}-01-01` }),
      ...(genres && { "movie:genre": genres }),
      ...(countries && { "movie:country": countries }),
    },
  };
}

// Generate metadata for search pages
export function generateSearchMetadata(query: string, totalResults?: number): Metadata {
  const title = `Tìm kiếm: "${query}"`;
  const description = totalResults 
    ? `Tìm thấy ${totalResults} kết quả cho "${query}". Xem phim online chất lượng HD miễn phí.`
    : `Tìm kiếm phim "${query}" tại ${NEXT_PUBLIC_SITE_NAME}. Xem phim online chất lượng HD miễn phí.`;

  return {
    title,
    description,
    robots: {
      index: false, // Don't index search pages
      follow: true,
    },
    alternates: {
      canonical: `/search?q=${encodeURIComponent(query)}`,
    },
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/search?q=${encodeURIComponent(query)}`,
    },
  };
}

// Generate metadata for category pages
export function generateCategoryMetadata(
  category: string,
  categoryName: string,
  page?: number
): Metadata {
  const title = page && page > 1 
    ? `${categoryName} - Trang ${page}`
    : categoryName;
  
  const description = `Xem phim ${categoryName.toLowerCase()} mới nhất ${page && page > 1 ? `trang ${page}` : ""} chất lượng HD miễn phí tại ${NEXT_PUBLIC_SITE_NAME}`;

  return {
    title,
    description,
    alternates: {
      canonical: page && page > 1 
        ? `/the-loai/${category}?page=${page}`
        : `/the-loai/${category}`,
    },
    openGraph: {
      title,
      description,
      url: `${NEXT_PUBLIC_SITE_URL}/the-loai/${category}${page && page > 1 ? `?page=${page}` : ""}`,
    },
  };
}

// Generate structured data for movies
export function generateMovieStructuredData(movie: {
  name: string;
  slug: string;
  content?: string;
  poster_url?: string;
  year?: number;
  category?: { name: string }[];
  country?: { name: string }[];
  actor?: string[];
  director?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.name,
    url: `${NEXT_PUBLIC_SITE_URL}/phim/${movie.slug}`,
    image: movie.poster_url,
    description: movie.content?.replace(/<[^>]*>/g, ""),
    dateCreated: movie.year ? `${movie.year}-01-01` : undefined,
    genre: movie.category?.map(cat => cat.name),
    countryOfOrigin: movie.country?.map(country => country.name),
    actor: movie.actor?.map(actor => ({
      "@type": "Person",
      name: actor,
    })),
    director: movie.director?.map(director => ({
      "@type": "Person", 
      name: director,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
