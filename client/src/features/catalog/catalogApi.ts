import { createApi } from "@reduxjs/toolkit/query/react";
import type { Product } from "../../product"; // 경로는 프로젝트에 맞게
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    // 목록
    fetchProduct: builder.query<Product[], void>({
      query: () => ({ url: "products" }),
    }),
    // 상세 — 오타 수정: prodcuts -> products
    fetchProductDetail: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),
  }),
});

export const {
  useFetchProductQuery,
  useFetchProductDetailQuery,
} = catalogApi;