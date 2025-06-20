import build from "next/dist/build";
import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (data: any) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags: ["logIn"]
        }),
        allUsers: build.query({
            query: ({ page, limit }) => ({
                url: `/admin/all-users?page=${page}&limit=${limit}`,
                method: "GET"
            }),
            providesTags: ["allUsers"]
        }),

        singleUser: build.query({
            query: (id) => ({
                url: `/admin/single-user/${id}`,
                method: "GET"
            })
        }),

        allCreators: build.query({
            query: ({ page, limit, email }) => ({
                url: `/user/creator-user-all?page=${page}&limit=${limit}&email=${email}`,
                method: "GET"
            }),
            providesTags: ["allCreators"]
        }),
        userStatusUpdate: build.mutation({
            query: (data) => {
                return {
                    url: `/user/status/${data?.id}`,
                    method: "PUT",
                }
            },
            invalidatesTags: ["allCreators", "allUsers"]
        }),
        dashboardInfo: build.query({
            query: () => ({
                url: `/admin/admin-details`,
                method: "GET"
            })  ,
            providesTags: ["dashboardInfo"]
        }),
    }),
})


export const { useLoginUserMutation, useAllCreatorsQuery, useAllUsersQuery, useUserStatusUpdateMutation, useSingleUserQuery, useDashboardInfoQuery } = userApi