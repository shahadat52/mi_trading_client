/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const attendanceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAttendanceById: builder.query({
            query: ({ id, year, month }) => (
                {
                    url: `/attendance/${id}`,
                    method: 'GET',
                    params: {
                        year,
                        month
                    }
                }),
            providesTags: ['Attendance']
        }),

        updateAttendanceStatus: builder.mutation({
            query: ({ id, status, date }: any) => (
                {
                    url: `/attendance/${id}`,
                    method: 'PATCH',
                    params: {
                        status,
                        date
                    }
                }),
            invalidatesTags: ['Attendance']
        }),

        updateBasicSalary: builder.mutation({
            query: ({ id, basicSalary }: any) => (
                {
                    url: `/attendance/basic/${id}`,
                    method: 'PATCH',
                    params: {
                        basicSalary
                    }
                }),
            invalidatesTags: ['Attendance']
        }),





    }),
});

export const { useGetAttendanceByIdQuery, useUpdateAttendanceStatusMutation, useUpdateBasicSalaryMutation } = attendanceApi