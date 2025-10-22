import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include'

})

type ErrorResponse = string | { title?: string } | { error?: string[] } | null | undefined;
const hasTitle = (data: unknown): data is { title: string } => typeof data === 'object' && data !== null && 'title' in data && typeof (data as { title: unknown }).title === 'string';
const hasErrorList = (data: unknown): data is { error: string[] } => typeof data === 'object' && data !== null && 'error' in data && Array.isArray((data as { error: unknown }).error);
const sleep = () => new Promise(resolve => setTimeout(resolve, 1000))

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading());
    if(import.meta.env.DEV)await sleep();
    const result = await customBaseQuery(args, api, extraOptions);
    api.dispatch(stopLoading())
    if (result.error) {
        const originalStatus = result.error.status === "PARSING_ERROR" && result.error.originalStatus
            ? result.error.originalStatus
            : result.error.status
        const responseData = result.error.data as ErrorResponse;

        switch (originalStatus) {
            case 400:
                if (typeof responseData === 'string') {
                    toast.error(responseData);
                } else if (hasErrorList(responseData)) {
                    throw Object.values(responseData.error).flat().join(',');
                } else if (hasTitle(responseData)) {
                    toast.error(responseData.title);
                } else {
                    toast.error('Bad request');
                }
                break;
            case 401:
                if (typeof responseData === 'string') {
                    toast.error(responseData);
                } else if (hasTitle(responseData)) {
                    toast.error(responseData.title);
                }
                break;
            case 404:
                if (hasTitle(responseData)) router.navigate('/not-found');
                break;
            case 500:
                if (responseData && typeof responseData === 'object')
                    router.navigate('/server-error', {state: {error: responseData}})
                break;
            
            default:
                break;
        }
    }
    return result;
}
