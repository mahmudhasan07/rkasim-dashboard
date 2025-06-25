import { useGetAllCoursesQuery } from "@/Redux/Api/courseApi";
import Image from "next/image";
import React from "react";

const AllCourse = () => {
  const { result, loading } = useGetAllCoursesQuery("", {
    selectFromResult: ({ data, isLoading }) => ({
      result: data?.data,
      loading: isLoading,
    }),
  });

  console.log(result);
  

  return <div>
    {
        loading ?
        <p>Loading...</p>
        :
        result?.map((item: any, index: number) => 
        <div key={index}>
            <Image src={item.thumbnailImage} alt="Image" width={500} height={500} className="w-"></Image>
            {item.title}
        </div>)
    }
  </div>;
};

export default AllCourse;
