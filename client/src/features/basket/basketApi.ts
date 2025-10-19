import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import type { Basket, Item } from "../../app/model/basket";
import type { Product } from "../../product";
import Cookies from 'js-cookie';

function isBasketItem(product: Product | Item): product is Item {
    return (product as Item).quantity !== undefined;
}

function getProductId(product: Product | Item): number {
    return isBasketItem(product) ? product.productId : product.id;
}

export const basketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['Basket'],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket, void>({
            query: () => 'basket',
            providesTags: ['Basket']

        }),
        addBasketItem: builder.mutation<Basket, { product: Product | Item, quantity?: number }>({
            query: ({ product, quantity }) => {
                const productId = getProductId(product);
                return {
                    url: `basket?productId=${productId}&quantity=${quantity ?? 1}`,
                    method: 'POST'
                }
            },
            onQueryStarted: async ({ product, quantity }, { dispatch, queryFulfilled }) => {
                const delta = quantity ?? 1;
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        const productId = getProductId(product);
                        const existingItem = draft.items.find(item => item.productId === productId);
                        if (existingItem) {
                            existingItem.quantity += delta;
                        } else {
                            draft.items.push({
                                productId,
                                name: product.name,
                                price: product.price,
                                pictureUrl: product.pictureUrl,
                                brand: product.brand,
                                type: product.type,
                                quantity: delta,
                            });
                        }
                    })
                )
                try {
                    await queryFulfilled;
                    dispatch(basketApi.util.invalidateTags(['Basket']))
                } catch (error) {
                    console.log(error);
                    patchResult.undo()
                }
            }
        }),
        removeBasketItem: builder.mutation<void, { productId: number, quantity: number }>({
            query: ({ productId, quantity }) => ({
                url: `basket?productId=${productId}&quantity=${quantity}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({ productId, quantity }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        const itemIndex = draft.items.findIndex(item => item.productId === productId)
                        if (itemIndex >= 0) {
                            draft.items[itemIndex].quantity -= quantity;
                            if (draft.items[itemIndex].quantity <= 0) {
                                draft.items.splice(itemIndex, 1)
                            }
                        }
                    })
                )
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.log(error)
                    patchResult.undo();
                }

            }
        }),
        clearBasket: builder.mutation<void, void>({
            queryFn: () => ({data: undefined}), 
            onQueryStarted: async(_ , {dispatch}) => {
                dispatch(
                    basketApi.util.updateQueryData('fetchBasket', undefined, (draft) => {
                        draft.items = []
                    })
                );
                Cookies.remove('basketId');
            }
        })
    })
});
export const {
    useFetchBasketQuery,
    useAddBasketItemMutation,
    useRemoveBasketItemMutation,
    useClearBasketMutation
} = basketApi;
