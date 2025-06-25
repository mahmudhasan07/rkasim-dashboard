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

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-5 gap-5 my-10">
          {result?.map((item: any, index: number) => (
            <div key={index} className="border w-fit p-5 rounded-lg">
              <Image
                src={item.thumbnailImage}
                alt="Image"
                width={500}
                height={500}
                className="w-60 h-52 object-cover"
              ></Image>
              <h1 className="text-xl font-semibold">{item.title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourse;
