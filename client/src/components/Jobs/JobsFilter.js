// import styles from "./JobsFilter.module.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Spinner from "../../UI/Spinner";
// import { Link } from "react-router-dom";
// import Abc from "./Abc";
// import Testing from "./Testing";
// const JobsFilter = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [setSortAlphabetically] = useState(false);
//   const [setSortbyDate] = useState(false);
//   const [sortType, setSortType] = useState("");
//   useEffect(() => {
//     const sortArray = (type) => {
//       const types = {
//         alphabetically: "location",
//         date: "date",
//         role: "role",
//       };
//       const sortProperty = types[type];
//       const sorted = [...jobs].sort((a, b) =>
//         a[sortProperty] > b[sortProperty] ? 1 : -1
//       );
//       setJobs(sorted);
//     };
//     sortArray(sortType);
//   }, [sortType]);

//   useEffect(() => {
//     setLoading(true);
//     //api is for getting jobs from the database
//     //make first schema and read plurization rules and then name get api
//     //const url = "/api/getJobs";
//     const url = `${process.env.REACT_APP_URL}/api/getJobs`;
//     axios
//       .get(url)
//       .then((res) => {
//         setLoading(false);
//         console.log(res.data);
//         setJobs(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);

//   //onclick sort by alphabets
//   const sortAlphabeticallyHandler = () => {
//     setSortAlphabetically(true);
//     const sortedJobs = jobs.sort((a, b) => {
//       if (a.role < b.role) {
//         return -1;
//       }
//       if (a.role > b.role) {
//         return 1;
//       }
//       return 0;
//     });
//     setJobs(sortedJobs);
//   };
//   const sortbyDateHandler = () => {
//     setSortbyDate(true);
//     const sortedJobs = jobs.sort((a, b) => {
//       if (a.date < b.date) {
//         return -1;
//       }
//       if (a.date > b.date) {
//         return 1;
//       }
//       return 0;
//     });
//     setJobs(sortedJobs);
//   };
//   //search on selected

//   const handleChange = (e) => {
//     setSearch(e.target.value);
//   };
//   //pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const [jobsPerPage] = useState(3);
//   const indexOfLastJob = currentPage * jobsPerPage;
//   const indexOfFirstJob = indexOfLastJob - jobsPerPage;
//   const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () => setCurrentPage(currentPage + 1);
//   const prevPage = () => setCurrentPage(currentPage - 1);
//   const lastPage = () => setCurrentPage(Math.ceil(jobs.length / jobsPerPage));
//   const firstPage = () => setCurrentPage(1);
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
//     pageNumbers.push(i);
//   }
//   const renderPageNumbers = pageNumbers.map((number) => {
//     if (number === currentPage) {
//       return (
//         <li key={number} className={styles.active}>
//           {number}
//         </li>
//       );
//     } else {
//       return (
//         <li key={number} onClick={() => paginate(number)}>
//           {number}
//         </li>
//       );
//     }
//   });

//   return (
//     <div>
//       <div id={styles.sandbox}>
//         <div className={styles.sideb}>
//           <h4 class="theme-color text-center">Hiring Alert</h4>
//           <p class="text-large theme-color">
//             Excited to work with us? Join Our Team
//           </p>
//           <input
//             className={styles.search}
//             placeholder="Search"
//             onChange={handleChange}
//             value={search}
//           />

//           <div className={styles.porpSection}>
//             <div className={styles.sortSection}>
//               <h3>Sort By:</h3>

//               <button
//                 className={styles.sort}
//                 onClick={sortAlphabeticallyHandler}
//               >
//                 Sort By Alphabetically
//               </button>

//               <button className={styles.sort} onClick={sortbyDateHandler}>
//                 Sort by Date Posted
//               </button>
//             </div>
//             <div className={styles.filterSection}>
//               <div className={styles.filter}>
//                 <h5>Filter Opening by Location</h5>
//                 <select
//                   id="location-filter"
//                   onChange={(e) => setSortType(e.target.value)}
//                   className={`${styles.location} ${styles.selectlist}`}
//                 >
//                   <option selected="selected" value="">
//                     All Locations
//                   </option>
//                   <option value="Hyderabad">Hyderabad</option>
//                   <option value="Bengalore">Bengalore</option>
//                   <option value="Mumbai">Mumbai</option>
//                   <option value="Pune">Pune</option>
//                 </select>
//               </div>
//               <div class="filter mt-3">
//                 <h5>Filter Opening by Job Type</h5>
//                 <select
//                   id="type-filter"
//                   className={`${styles.jobtypefilter} ${styles.selectlist}`}
//                 >
//                   <option
//                     selected="selected"
//                     value=""
//                     onChange={(e) => setSortType(e.target.value)}
//                   >
//                     All Job Types
//                   </option>
//                   <option value="Full Time">Full Time</option>

//                   <option value="Part Time">Part Time</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.listb}>
//           <ul className={styles.list} id={styles.list}>
//             <div className=" flex justify-center items-center bg-gray-200 ">
//               <div>
//                 <div className="p-1">
//                   {loading ? (
//                     <Spinner />
//                   ) : (
//                     <div>
//                       {currentJobs
//                         .filter((item) =>
//                           item.role.toLowerCase().includes(search) ||
//                           item.location.toLowerCase().includes(search) ||
//                           item.workingTime.toLowerCase().includes(search)
//                             ? item
//                             : null
//                         )
//                         .map((job) => (
//                           <Abc
//                             key={job._id}
//                             logo={job.logo}
//                             name={job.name}
//                             role={job.role}
//                             workingTime={job.workingTime}
//                             date={job.date}
//                             location={job.location}
//                           />
//                         ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </ul>
//           <div className={styles.pagination}>
//             <ul className={styles.pageNumbers}>
//               <li>
//                 <button
//                   onClick={firstPage}
//                   disabled={currentPage === pageNumbers[0] ? true : false}
//                 >
//                   <i class="fas fa-angle-double-left"></i>
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === pageNumbers[0] ? true : false}
//                 >
//                   <i class="fas fa-angle-left"></i>
//                 </button>
//               </li>
//               {renderPageNumbers}
//               <li>
//                 <button
//                   onClick={nextPage}
//                   disabled={
//                     currentPage === pageNumbers[pageNumbers.length - 1]
//                       ? true
//                       : false
//                   }
//                 >
//                   <i class="fas fa-angle-right"></i>
//                 </button>
//               </li>
//               <li>
//                 <button
//                   onClick={lastPage}
//                   disabled={
//                     currentPage === pageNumbers[pageNumbers.length - 1]
//                       ? true
//                       : false
//                   }
//                 >
//                   <i class="fas fa-angle-double-right"></i>
//                 </button>
//               </li>
//             </ul>
//           </div>

//           <div className={styles.lpagignate}>
//             <span
//               className={`${styles.jPaginateBack} ${styles.pagearrow}`}
//             ></span>
//             <ul className={styles.pagination}></ul>
//             <span
//               className={`${styles.jPaginateNext} ${styles.pagearrow}`}
//             ></span>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default JobsFilter;
