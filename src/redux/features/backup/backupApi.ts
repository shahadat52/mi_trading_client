import { baseApi } from "../../api/baseApi";

const backupApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        databaseBackup: builder.mutation<Blob, void>({
            query: () => ({
                url: "/backup/database",
                method: "GET",
                responseHandler: async (response) =>
                    await response.blob(),
            }),
        }),
    }),
});

export const {
    useDatabaseBackupMutation,
} = backupApi;