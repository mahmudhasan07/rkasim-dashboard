"use client";
import React, { useState } from "react";
import AddCourseForm from "./AddCourse";
import AllCourse from "./AllCourse";

const Course = () => {
  const [activeTab, setActiveTab] = useState("All Courses");

  const tabs = ["All Courses", "Add Course"];

  const renderContent = () => {
    switch (activeTab) {
      case "All Courses":
        return <AllCourse></AllCourse>;
      case "Add Course":
        return <AddCourseForm></AddCourseForm>;
    }
  };

  return (
    <section className="p-5">
      <div className="flex gap-10  border-b-2 p-3 text-xl">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer ${
              activeTab === tab ? "text-primary font-semibold" : ""
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div> {renderContent()}</div>
    </section>
  );
};

export default Course;
