import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (userInfo) => (
                console.log(userInfo),
                {
                    url: "/users/create-user",
                    method: "POST",
                    body: userInfo
                }
            ),
        }),

        login: builder.mutation({
            query: (userInfo) => ({
                url: '/auth/login',
                method: 'POST',
                body: userInfo
            })
        }),

        otpVerify: builder.mutation({
            query: (otpData) => ({
                url: '/auth/otpVerify',
                method: 'POST',
                body: otpData
            })
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useOtpVerifyMutation } = authApi