"use client";
import { useSingleUserQuery } from "@/Redux/Api/userApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const UserDetails = () => {
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
        "loading..."
      ) : (
        <div className="w-full max-w-4xl mx-auto bg-white border border-gray-300 rounded-3xl shadow-lg p-8 space-y-6">
          {/* Profile Header Section */}
          <div className="flex items-center justify-start space-x-6">
            <div className="flex-shrink-0">
              <Image
                src={profile?.image}
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full border-4 border-indigo-600 shadow-md"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-4xl font-extrabold text-gray-800">
                {profile?.name}
              </h2>
              <p className="text-xl text-gray-600">{profile?.role}</p>
              <p className="mt-4 text-lg text-gray-500">{profile?.about}</p>
              {profile?.age ? (
                <p className="mt-2 text-sm text-gray-600">Age: {profile?.age}</p>
              ) : null}
              {profile?.location ? (
                <p className="mt-2 text-sm text-gray-600">
                  Location: {profile?.location}
                </p>
              ) : null}
              {profile?.country ? (
                <p className="mt-2 text-sm text-gray-600">
                  Country: {profile?.country}
                </p>
              ) : null}
              <p className="mt-2 text-sm text-gray-600">
                Status: {profile?.status}
              </p>
              {profile?.isVerified ? (
                <p className="mt-2 text-sm text-green-600">Verified</p>
              ) : null}
            </div>
          </div>

          {/* Skills Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-gray-700">Skills</h3>
            {profile?.skills && profile.skills.length > 0 ? (
              <ul className="mt-2 space-y-2 text-gray-600">
                {profile.skills.map((skill : any, index : any) => (
                  <li key={index} className="text-lg">
                    - {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No skills listed.</p>
            )}
          </div>

          {/* Experience Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-gray-700">Experience</h3>
            {profile.experience && profile.experience.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {profile.experience.map((exp, index) => (
                  <li key={index} className="text-lg">
                    <p className="font-medium text-gray-800">{exp.company}</p>
                    <p className="text-gray-500">
                      {exp.title} - {exp.startDate} to {exp.endDate}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No experience listed.</p>
            )}
          </div>

          {/* Education Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-gray-700">Education</h3>
            {profile.education && profile.education.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {profile.education.map((edu, index) => (
                  <li key={index} className="text-lg">
                    <p className="font-medium text-gray-800">{edu.institute}</p>
                    <p className="text-gray-500">
                      {edu.degreeName} in {edu.fieldOfStudy} ({edu.startDate} -{" "}
                      {edu.endDate})
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No education listed.</p>
            )}
          </div>

          {/* Job Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-semibold text-gray-700">
              Current Job
            </h3>
            {profile.Job ? (
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  {profile.Job.companyName} - {profile.Job.position}
                </p>
                <p className="text-gray-600">
                  Location: {profile.Job.location}
                </p>
                <p className="text-gray-600">
                  Skills Required: {profile.Job.skills.join(", ")}
                </p>
                <p className="text-gray-600">
                  Salary Range: {profile.Job.salaryRange}
                </p>
                <p className="text-gray-600">
                  Description: {profile.Job.description}
                </p>
                <a
                  href={profile.Job.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Company Website
                </a>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No current job listed.</p>
            )}
          </div>

          {/* NID Image Section */}
          <div>
            <h3 className="text-3xl font-semibold text-gray-700">NID Image</h3>
            {profile.nidImage ? (
              <Image
                src={profile.nidImage}
                alt="NID Image"
                width={400}
                height={250}
                className="rounded-lg shadow-md"
              />
            ) : (
              <p className="text-sm text-gray-500">No NID image available.</p>
            )}
          </div>

          {/* Contact Button */}
          <div className="mt-6 text-center">
            <a
              href={`mailto:${profile.email}`}
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
