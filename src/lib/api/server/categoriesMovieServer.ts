import { customFetch } from "@/libs/utils";
import type { ArticleResponse, CategoriesType } from "@/types/common";

const movieServerApi = {
  async getCategoryList(
    params?: Record<string, string>
  ): Promise<CategoriesType[] | undefined> {
    const searchParams = new URLSearchParams({
      ...params,
    }).toString();

    try {
      const response = await customFetch<CategoriesType[]>(
        `the-loai?${searchParams}`
      );

      if (!response) return undefined;

      return response;
    } catch (error) {
      return undefined;
    }
  },
};

export default movieServerApi;
