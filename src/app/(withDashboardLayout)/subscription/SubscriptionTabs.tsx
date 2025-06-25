"use client";
import SubscriptionTable from "@/components/Table/SubscriptionTable";
import { useAllSubscriptionUsersQuery } from "@/Redux/Api/userApi";
import React, { useState } from "react";

const SubscriptionTabs = () => {
  const [activeTab, setActiveTab] = useState("Basic");
  const [page, setPage] = useState(1);
  const limit = 10;
  const render = () => {};

  const types = ["Basic", "Premium", "Platinum"];

  const { result, isLoading, pages } = useAllSubscriptionUsersQuery(
    { limit, page, status: activeTab },
    {
      selectFromResult: ({ data, isLoading }) => ({
        result: data?.data,
        isLoading,
        pages: data?.meta?.totalPage
      }),
    }
  );

  const button = result && [...Array(pages).keys()];

  console.log("result", result);

  return (
    <div className="p-5">
      <div className="flex  gap-10 text-lg font-semibold border-b-2 px-5">
        {types.map((type, index) => (
          <div
            className={`flex items-center justify-between mb-3 cursor-pointer ${
              activeTab === type ? "text-primary font-semibold" : ""
            }`}
            key={index}
            onClick={() => setActiveTab(type)}
          >
            {type}
          </div>
        ))}
      </div>

      <div>
        <SubscriptionTable
          userData={result}
          isLoading={isLoading}
          serial={page * limit - limit}
        ></SubscriptionTable>
      </div>

      <div className="flex justify-center gap-5 mt-5">
        {button &&
          button.map((item: string, index: number) => (
            <button
              onClick={() => setPage(index + 1)}
              className={`border-2 px-3 py-1 rounded-lg font-bold ${
                page === index + 1 ? "bg-primary text-white" : ""
              }`}
              key={index}
            >
              {item + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SubscriptionTabs;
