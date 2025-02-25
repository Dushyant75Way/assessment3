import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

const baseUrl = "http://localhost:5000"

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),

    endpoints: (builder) => ({
        aiExplain: builder.mutation<ApiResponse<{ correct_answer: string, explanation: string }>, { question: string }>({
            query: (body) => {
                return { url: `/get-explanation`, method: 'POST', body }
            },
        }),
    }),
});

export const { useAiExplainMutation } = api