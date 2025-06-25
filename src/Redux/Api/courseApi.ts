import baseApi from "./baseApi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCourses: build.query({
      query: ({ page, limit }) => ({
        url: `/course`,
        method: "GET",
      }),
    }),
    addCourse: build.mutation({
      query: (data) => ({
        url: `/admin/courses`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllCoursesQuery, useAddCourseMutation } = courseApi;
