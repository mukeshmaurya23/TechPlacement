import React from "react";
import Testing from "./Testing";

const Jobs = () => {
  return (
    <div className="container">
      <Testing />
    </div>
  );
};

export default Jobs;
/*


  {loading ? (
        <Spinner />
      ) : (
        <div>
          {jobs.map((job) => {
            return (
              <div className="h-screen flex justify-center items-center bg-gray-200 p-3">
                <article className="rounded-lg shadow-lg bg-white p-4 max-w-xs mx-auto">
                  <header className="flex mb-4">
                    <img
                      className="h-12 rounded-lg"
                      src={job.logo}
                      alt="...."
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div className="ml-4">
                      <p className="text-gray-900 font-semibold">{job.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{job.author}</p>
                    </div>
                  </header>
                  <p className="mb-4 text-gray-600 text-sm leading-relaxed">
                    {job.title}
                  </p>
                  <p className="text-gray-900 font-semibold text-sm">
                    {job.salary}
                  </p>
                  <footer className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      {job.location}
                      <span className="text-gray-600 text-sm ml-1">{job.date}</span>
                    </p>
                    <a href="#" className="text-blue-500 hover:text-blue-700">
                      Apply
                    </a>
                  </footer>
                </article>
              </div>
            );
          })}
        </div>
      )}
*/
