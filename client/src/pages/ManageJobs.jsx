import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Ensure `react-toastify` is installed
import axios from "axios";
import { AppContext } from "../context/AppContext"; // Assuming proper context is setup

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { backendUrl, companyToken } = useContext(AppContext);

  // Function to fetch company Job Application data
  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/list-job`, {
        headers: { token: companyToken },
      });
      
      if (data.success) {
        setJobs(data.jobsData.reverse()); // Keep newest jobs first
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("No job found");
      toast.error("Failed to fetch jobs. Please try again later.");
    }
  };

  // Function to change job visiblity
  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visiblity",
        {
          id,
        },
        {
          headers: { token: companyToken },
        }
      );
      if (data.success) {
        toast.success(data.message)
        fetchCompanyJobs()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Date
              </th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {moment(job.date).format("LL")}
                  </td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    {job.applicants}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      className="scale-125 ml-4"
                      type="checkbox"
                      checked={job.visible}
                      onChange={() => changeJobVisiblity(job._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => navigate("/dashboard/add-job")}
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
        >
          Add New Job
        </button>
      </div>
    </div>
  );
};

export default ManageJobs;
