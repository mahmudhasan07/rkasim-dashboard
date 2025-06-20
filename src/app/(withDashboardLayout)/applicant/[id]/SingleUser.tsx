"use client";
import { useSingleUserQuery } from "@/Redux/Api/userApi";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

const SingleUser = () => {
  const id = useParams().id;

  const { profile, isLoading } = useSingleUserQuery(id, {
    selectFromResult: ({ data, isLoading }) => ({
      profile: data?.data,
      isLoading,
    }),
  });

  console.log("profile", profile);

  return (
    <div>
      {isLoading ? (
        "loading.."
      ) : (
        <div className="w-full max-w-7xl mx-auto bg-white border border-gray-200 mt-5 rounded-2xl shadow-lg p-8 space-y-6">
          <div className="flex items-center justify-start space-x-6">
            <div className="flex-shrink-0">
              <Image
                src={profile?.image}
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full border-2 h-48 w-48 object-cover  shadow-md"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold text-gray-800">
                {profile?.name}
              </h2>
              <p className="text-xl text-gray-600">{profile?.role}</p>
              <p className="mt-4 text-lg text-gray-500">{profile?.about}</p>
              <p className="mt-2 text-sm text-gray-600">Age: {profile?.age}</p>
              <p className="mt-2 text-sm text-gray-600">
                Location: {profile?.location}, {profile?.country}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Gender: {profile?.gender}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Status: {profile?.status}
              </p>
              {profile?.isVerified && (
                <p className="mt-2 text-sm text-green-600">Verified</p>
              )}
            </div>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-3xl font-semibold text-gray-700">Skills</h3>
              <ul className="mt-2 space-y-2 text-gray-600">
                {profile?.skills.map((skill : any, index : any) => (
                  <li key={index} className="text-lg">
                    - {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-gray-700">
                Experience
              </h3>
              <ul className="mt-2 space-y-2">
                {profile?.experience ? (
                  profile.experience.map((exp : any, index : any) => (
                    <li key={index} className="text-lg">
                      <p className="font-medium text-gray-800">{exp.company}</p>
                      <p className="text-gray-500">{exp.type}, {exp.title}</p>
                      <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No experience listed.</p>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-gray-700">
                Education
              </h3>
              <ul className="mt-2 space-y-2">
                {profile?.education ? (
                  profile.education.map((edu : any, index : any) => (
                    <li key={index} className="text-lg">
                      <p className="font-medium text-gray-800">{edu.institute}</p>
                      <p className="text-gray-500">{edu.degreeName} in {edu.fieldOfStudy} </p>
                      <p className="text-gray-500">{edu.startDate} - {edu.endDate}</p>
                      <p className="text-gray-500"><span className="font-semibold text-gray-700">GPA:</span> {edu.grade}</p>
                      <p className="text-gray-500"> <span className="font-semibold text-gray-700">Description:</span> {edu.description}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No education listed.</p>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-gray-700">CV</h3>
              <a
                href={profile?.CV}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Download CV
              </a>
            </div>

            <div>
              <h3 className="text-3xl font-semibold text-gray-700">
                NID Image
              </h3>
              <Image
                src={profile?.nidImage}
                alt="NID Image"
                width={400}
                height={250}
                className="rounded-lg shadow-md"
              />
            </div>

            <div className="mt-6 text-center">
              <a
                href={`mailto:${profile?.email}`}
                className="inline-block px-8 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary/80 transition duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUser;
