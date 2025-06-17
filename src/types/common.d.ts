export type ParamsPageType = { locale: string; slug: string }

export type CustomTypeConfig<T> = Record<string, T>

export type QUERY_STATUS_TYPE = 'Y' | 'N'

export type ApiResponse<Data> = {
  count: number
  next: string
  previous: string
  results: Data
  statusCode?: number
}

export type ApiRequest<Data> = {
  statusCode?: number | undefined
  success: boolean
  data: Data
  pagination?: PaginationType
  validator?: Record<string, string>
  common_error?: string
  message?: string
}

export interface ConfigItem {
  config_key: string
  config_content: string
}

export interface MetadataType {
  title: string
  page_meta_description: string
  page_meta_keyword: string
  page_meta_image: string
  current_url: string
  locale?: string
  lang: string
  location: string
  page_name: string
  page_seo?: string
}

export interface Country {
  country_iso_alpha2: string
  country_iso_alpha3: string
  country_name: string
  country_iso_numeric: number
  country_phone_code: number
  country_continent_code: string
  country_currency_code: string
}

export interface Language {
  code: string
  name: string
  is_active: boolean
}

export interface PageTranslation {
  page_trans_id: number
  page_trans_name: string
  page_trans_slug: string
  page_trans_title: string
  page_trans_content: string
  page_trans_language: string
  page_trans_country: string
  page_trans_keyword: string
  page_trans_meta_description: string
  page_trans_meta_image: string
  page_trans_meta_keyword: string
  page_trans_style: string
}

export interface PageResponse {
  page_id: number
  page_name: string
  page_slug: string
  page_title: string
  page_content: string
  page_keyword: string | null
  page_meta_description: string
  page_meta_image: string | null
  page_meta_keyword: string
  page_style: string
  page_active: boolean
  page_is_landing_page: boolean
  page_is_sitemap: boolean
  page_priority: string | null
  page_publish_time: string
  created_at: string
  updated_at: string
  translations: PageTranslation[]
  categories: any[] // hoặc tạo interface riêng nếu có structure cụ thể
  page_categories: any[] // giống như trên
  formatted_page_publish_time: string
  formatted_created_at: string
  formatted_updated_at: string
}

export interface PaginatedPageResponse {
  count: number
  next: string | null
  previous: string | null
  results: PageResponseItem[]
}

interface ArticleResponse {
  ar_id: string
  categories: {
    name: string
    slug: string
  }[]
  ar_type: string
  ar_name: string
  ar_slug: string
  ar_active: boolean
  ar_is_published: boolean
  ar_thumbnail: string
  ar_title: string
  ar_content: string
  ar_meta_keyword: string
  ar_meta_description: string
  ar_meta_image: string
  ar_author: string
  ar_insert_time: string
  ar_update_time: string
  ar_image: string
  ar_user: number
  ar_user_updated: number
  ar_categories: number[]
  formatted_insert_time: string
  formatted_update_time: string
  formatted_insert_date: string
  formatted_update_date: string
  formatted_publish_time: string
  formatted_publish_date: string
  thumbnail_url: string
  ar_custom_fields_json: any
  translations: {
    ar_trans_id: number
    ar_trans_name: string
    ar_trans_slug: string
    ar_trans_thumbnail: string
    ar_trans_title: string
    ar_trans_content: string
    ar_trans_meta_keyword: string
    ar_trans_meta_description: string
    ar_trans_meta_image: string
    ar_trans_author: string
    ar_trans_insert_time: string
    ar_trans_update_time: string
    ar_trans_article: number
    ar_trans_language: string
    ar_trans_country: string
    ar_trans_user_updated: number
  }[]
  banners?: {
    banner_id?: number
    banner_code?: string
    banner_detail_image?: string
    banner_detail_image_mobile?: string
  }[]
}

export interface CategoriesType {
  category_id: number
  category_name: string
  category_slug: string
  category_type: string
  category_active: boolean
  category_order: number
}

export interface CategoriesResponse extends CategoriesType {
  category_parent: CategoriesType
  children: CategoriesType[]
}

export interface Banner {
  banner_id: number
  banner_code: string
  banner_type: string
  banner_use_page: string
  banner_use_article: string
  banner_locations: string
  banner_interval: number
  details: BannerDetails[]
}

export interface BannerDetails {
  banner_detail_id: number
  banner_detail_title: string
  banner_detail_subtitle: string
  banner_detail_content: string
  banner_detail_link: string
  banner_detail_image: string
  banner_detail_sub_image: string
  banner_detail_image_mobile: string
  banner_detail_order: number
}

export interface BreadcrumbType {
  name: string
  url: string
}

export interface SearchArticle {
  page?: number
  per_page?: number
  ar_type?: string
  slug?: string
  search?: string
}

export interface CategoriesType {
  _id: number
  name: string
  slug: string
}
