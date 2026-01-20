import { baseApi } from "../../api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /* User Registration */
        register: builder.mutation(
            {
                query: (userInfo) => (
                    {
                        url: "/users/create-user",
                        method: "POST",
                        body: userInfo
                    }
                ),
            }
        ),

        /* User Login */
        login: builder.mutation(
            {
                query: (userInfo) => ({
                    url: '/auth/login',
                    method: 'POST',
                    body: userInfo,
                    credentials: 'include'
                })
            }
        ),

        /* Verify OTP */
        otpVerify: builder.mutation({
            query: (otpData) => (
                {
                    url: '/auth/otpVerify',
                    method: 'POST',
                    body: otpData
                }
            )
        }),

        /* Get All Users */
        getAllUsers: builder.query({
            query: () => (

                {
                    url: '/users',
                    method: 'GET',
                }
            ),
            providesTags: ['User']

        }),

        /* Get My Data */
        getMyData: builder.query({
            query: () => (

                {
                    url: '/users/me',
                    method: 'GET',
                }
            )
        }),

        /* Update User */
        updateUser: builder.mutation({
            query: (userData) => (
                {
                    url: '/users/update-user',
                    method: 'PATCH',
                    body: userData
                }
            ),
            invalidatesTags: ['User']
        }),

        updateRole: builder.mutation({
            query: (data) => (
                {
                    url: `/users/role/${data.id}`,
                    method: 'PATCH',
                    body: { role: data.role }
                }
            ),
            invalidatesTags: ['User']
        }),

        updateStatus: builder.mutation({
            query: (data) => (
                {
                    url: `/users/status/${data.id}`,
                    method: 'PATCH',
                    body: { status: data.status }
                }
            ),
            invalidatesTags: ['User']
        }),



    }),
});

export const { useRegisterMutation, useLoginMutation, useOtpVerifyMutation, useGetAllUsersQuery, useGetMyDataQuery, useUpdateUserMutation, useUpdateRoleMutation, useUpdateStatusMutation } = authApi