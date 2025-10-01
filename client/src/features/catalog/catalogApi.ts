import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../product"; // 경로는 프로젝트에 맞게
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { ProductParams } from "../../app/model/productParams";
import type { Pagination } from "../../app/model/pagination";
import { filterEmptyValues } from "../../app/shared/utils/filterEmptyValues";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    // 목록
    fetchProduct: builder.query<
      { items: Product[]; pagination: Pagination | null },
      ProductParams
    >({
      query: ({ brands, types, ...rest }) => {
        const params = filterEmptyValues({
          ...rest,
          brand: brands.join(","),
          types: types.join(","),
        });

        return {
          url: "products",
          params,
        };
      },
      transformResponse: (
        items: Product[],
        meta
      ): { items: Product[]; pagination: Pagination | null } => {
        const paginationHeader = meta?.response?.headers.get("pagination");
        const pagination = paginationHeader
          ? (() => {
              const parsed = JSON.parse(paginationHeader) as Partial<Pagination> &
                Record<string, number | undefined>;
              return {
                currentPage: parsed.currentPage ?? (parsed.CurrentPage as number) ?? 1,
                totalPages: parsed.totalPages ?? (parsed.TotalPages as number) ?? 1,
                pageSize: parsed.pageSize ?? (parsed.PageSize as number) ?? 0,
                totalCount: parsed.totalCount ?? (parsed.TotalCount as number) ?? 0,
              } satisfies Pagination;
            })()
          : null;

        return { items, pagination };
      },
    }),
    // 상세 — 오타 수정: prodcuts -> products
    fetchProductDetail: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),

    fetchFilters: builder.query<{ brands: string[]; types: string[] }, void>({
      query: () => "products/filters",
    }),
  }),
});

export const {
  useFetchProductQuery,
  useFetchProductDetailQuery,
  useFetchFiltersQuery,
} = catalogApi;
