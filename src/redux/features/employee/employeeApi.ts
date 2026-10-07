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

        getEmployeeById: builder.query({
            query: (id) => (
                {
                    url: `/employee/me/${id}`,
                    method: 'GET',
                }),
            providesTags: ['Employee']
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
        updateEmployeeData: builder.mutation<any, { id: string; formData: FormData }>({
            query: ({ id, formData }) => (
                {
                    url: `/employee/update/${id}`,
                    method: 'PATCH',
                    body: formData
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

        generateMonthlyPayroll: builder.mutation({
            query: () => (
                {
                    url: `/employee/monthly/payroll`,
                    method: 'POST'
                }
            )
        }),





    }),
});

export const { useJoinEmployeeMutation, useGetAllEmployeesQuery, useGetEmployeeByIdQuery, useUpdateEmployeeDataMutation, useUpdateEmployeeRoleMutation, useUpdateEmployeeStatusMutation, useFireEmployeeMutation, useGenerateMonthlyPayrollMutation } = employeeApi