"use client";
import { useSingleUserQuery } from "@/Redux/Api/userApi";
import { useParams } from "next/navigation";
import React from "react";

const UserDetails = () => {
  const id = useParams().id;
  const { userData, isLoading } = useSingleUserQuery(id, {
    selectFromResult: ({ data, isLoading }) => ({
      userData: data?.data,
      isLoading,
    }),
  });

  console.log("userData", userData);
  return <div></div>;
};

export default UserDetails;
