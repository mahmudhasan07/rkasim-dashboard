import { useGetAllCoursesQuery } from "@/Redux/Api/courseApi";
import React from "react";

const AllCourse = () => {
  const { result, loading } = useGetAllCoursesQuery("", {
    selectFromResult: ({ data, isLoading }) => ({
      result: data?.data,
      loading: isLoading,
    }),
  });

  console.log(result);
  

  return <div></div>;
};

export default AllCourse;
