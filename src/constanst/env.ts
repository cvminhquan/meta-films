// =============================================================================
// APPLICATION CONFIGURATION
// =============================================================================

export const NEXT_PUBLIC_SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Meta Films";
export const NEXT_PUBLIC_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const NEXT_PUBLIC_SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Xem phim online miễn phí chất lượng cao";

// =============================================================================
// API CONFIGURATION
// =============================================================================

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://phimapi.com";
export const NEXT_PUBLIC_TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
export const NEXT_PUBLIC_TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
export const NEXT_PUBLIC_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "https://image.tmdb.org/t/p";

// =============================================================================
// EMBED PLAYERS CONFIGURATION
// =============================================================================

export const NEXT_PUBLIC_EMBED_URL = process.env.NEXT_PUBLIC_EMBED_URL || "https://2embed.cc/embed";
export const NEXT_PUBLIC_EMBED_TV_URL = process.env.NEXT_PUBLIC_EMBED_TV_URL || "https://2embed.cc/embedtv";
export const NEXT_PUBLIC_EMBED_TO = process.env.NEXT_PUBLIC_EMBED_TO || "https://www.2embed.cc/embed/tmdb";
export const NEXT_PUBLIC_EMBED_VIDSRC = process.env.NEXT_PUBLIC_EMBED_VIDSRC || "https://vidsrc.me/embed";
export const NEXT_PUBLIC_EMBED_VIDSRC_PRO = process.env.NEXT_PUBLIC_EMBED_VIDSRC_PRO || "https://vidsrc.pro/embed";
export const NEXT_PUBLIC_EMBED_SUPEREMBED = process.env.NEXT_PUBLIC_EMBED_SUPEREMBED || "https://multiembed.mov/directstream.php";

// =============================================================================
// AUTHENTICATION
// =============================================================================

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

// =============================================================================
// PERFORMANCE & CACHING
// =============================================================================

export const NEXT_PUBLIC_CACHE_TTL = parseInt(process.env.NEXT_PUBLIC_CACHE_TTL || "300");
export const NEXT_PUBLIC_IMAGE_CACHE_TTL = parseInt(process.env.NEXT_PUBLIC_IMAGE_CACHE_TTL || "86400");
export const NEXT_PUBLIC_API_RATE_LIMIT = parseInt(process.env.NEXT_PUBLIC_API_RATE_LIMIT || "100");
export const NEXT_PUBLIC_API_RATE_WINDOW = parseInt(process.env.NEXT_PUBLIC_API_RATE_WINDOW || "60");

// =============================================================================
// DEVELOPMENT SETTINGS
// =============================================================================

export const NODE_ENV = process.env.NODE_ENV || "development";
export const NEXT_PUBLIC_DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";
export const NEXT_PUBLIC_SHOW_API_LOGS = process.env.NEXT_PUBLIC_SHOW_API_LOGS === "true";

// =============================================================================
// SEO & ANALYTICS
// =============================================================================

export const NEXT_PUBLIC_DEFAULT_LANG = process.env.NEXT_PUBLIC_DEFAULT_LANG || "vi";
export const NEXT_PUBLIC_DEFAULT_LOCATION = process.env.NEXT_PUBLIC_DEFAULT_LOCATION || "VN";

// =============================================================================
// LEGACY SUPPORT (Deprecated)
// =============================================================================

// @deprecated Use NEXT_PUBLIC_SITE_URL instead
export const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_BASE_URL || "";
// @deprecated Use NEXT_PUBLIC_SITE_NAME instead
export const NEXT_PUBLIC_SITE = process.env.NEXT_PUBLIC_SITE_NAME || process.env.NEXT_PUBLIC_SITE || "meta-films";
// @deprecated Use NEXT_PUBLIC_API_URL instead
export const NEXT_PUBLIC_BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL;

export const NEXT_PRIVATE_BASE_API_PUBLIC_KEY = process.env.NEXT_PRIVATE_BASE_API_PUBLIC_KEY;
