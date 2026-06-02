import { baseApi } from "../../api/baseApi";


const employeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        joinEmployee: builder.mutation({
            query: (employeeData) => (
                {
                    url: "/employee/create-employee",
                    method: "POST",
                    body: employeeData,
                }
            ),
            invalidatesTags: ['Employees']
        }),
        getAllEmployees: builder.query({
            query: () => {
                return {
                    url: '/employee',
                    method: 'GET',
                };
            },
            providesTags: ['Employees'],
        }),


        /* Update Employee Data */
        updateEmployeeData: builder.mutation({
            query: (userData) => (
                {
                    url: '/employee/update-employee',
                    method: 'PATCH',
                    body: userData
                }
            ),
            invalidatesTags: ['Employees']
        }),

        updateEmployeeRole: builder.mutation({
            query: (data) => (
                {
                    url: `/employee/role/${data.id}`,
                    method: 'PATCH',
                    body: { role: data.role }
                }
            ),
            invalidatesTags: ['Employees']
        }),

        updateEmployeeStatus: builder.mutation({
            query: (data) => (
                {
                    url: `/employee/status/${data.id}`,
                    method: 'PATCH',
                    body: { status: data.status }
                }
            ),
            invalidatesTags: ['Employees']
        }),

        fireEmployee: builder.mutation({
            query: (id) => (
                {
                    url: `/employee/${id}`,
                    method: 'DELETE'
                }
            ),
            invalidatesTags: ['Employees']
        }),





    }),
});

export const { useJoinEmployeeMutation, useGetAllEmployeesQuery, useUpdateEmployeeDataMutation, useUpdateEmployeeRoleMutation, useUpdateEmployeeStatusMutation, useFireEmployeeMutation } = employeeApi