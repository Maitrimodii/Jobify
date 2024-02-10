import React, { useState } from "react";

const AddJobForm = ({
  job,
  setJob,
  buttonName,
  onSubmit,
}) => {
  console.log(job);
 // Function to handle input changes
 const handleChange = (e) => {
  e.preventDefault();
  const { name, value } = e.target;
  setJob((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

// Function to handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(job);
};

  return (
    <div className="flex items-center justify-center mb-6 mt-6 text-gray-600">
      <div className="container max-w-2xl w-full mx-auto p-8 border border-gray-300 rounded">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">
          Post Job
        </h2>
        <form onSubmit={handleSubmit}>
         {/* Input for Company */}
          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="company">
              Company:
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={job.company}
              className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="position">
              Position:
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={job.position}
              className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
            />
          </div>

          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="workType">
              Work Type:
            </label>
            <div className="w-3/4 relative">
              <select
                className="w-full px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300 appearance-none"
                id="workType"
                name="workType"
                value={job.workType}
                onChange={handleChange}>
                <option value="full-time">
                  Full-time
                </option>
                <option value="part-time">
                  Part-time
                </option>
                <option value="internship">
                  Internship
                </option>
                <option value="remote">
                  Remote
                </option>
              </select>
            </div>
          </div>
          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="salary">
              Salary:
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={job.salary}
              className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="workLocation">
              Work Location:
            </label>
            <input
              type="text"
              id="workLocation"
              name="workLocation"
              value={job.workLocation}
              className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="experience">
              Experience:
            </label>
            <input
              type="text"
              id="experience"
              name="experience"
              value={job.experience}
              className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="applyBy">
              Apply By:
            </label>
            <input
              type="date"
              id="applyBy"
              name="applyBy"
              value={job.applyBy}
              className="w-3/4 px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <label
              className="w-1/4 block mb-4 py-2"
              htmlFor="skill">
              Skills:
            </label>
            <div className="w-3/4">
              <input
                type="text"
                id="skill"
                name="skill"
                placeholder="Enter skills (comma-separated)"
                value={job.skill}
                className="w-full px-4 py-2 border-b border-gray-400 rounded mb-6 focus:outline-none focus:ring focus:border-blue-300"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-1/4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;