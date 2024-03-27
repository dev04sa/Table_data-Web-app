"use client";

import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseapp, firestore } from "./firebase-config";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

const FilterComponent = () => {
  const [filters, setFilters] = useState([
    {
      id: Math.random().toString(),
      columnName: "",
      operator: "",
      value: "",
      condition: "OR",
    },
  ]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchColumns = async () => {
      const columnsRef = collection(firestore, "users");
      const snapshot = await getDocs(columnsRef);

      if (!snapshot.empty) {
        const columnsData = Object.keys(snapshot.docs[0].data());
        setColumns(columnsData);
      }
    };

    fetchColumns();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const userCollection = collection(firestore, "users");
      let userQuery = query(userCollection);

      filters.forEach(async (filter, index) => {
        if (filter.columnName && filter.operator && filter.value) {
          if (index === 0) {
            if (
              filter.columnName === "followersCount" ||
              filter.columnName === "followingCount"
            ) {
              userQuery = query(
                userCollection,
                where(
                  filter.columnName,
                  filter.operator,
                  parseInt(filter.value)
                )
              );
            } else if (filter.columnName === "verified") {
              //  on "verified" field
              if (filter.value.toLowerCase() === "true") {
                userQuery = query(
                  userCollection,
                  where(filter.columnName, "==", true)
                );
              } else if (filter.value.toLowerCase() === "false") {
                userQuery = query(
                  userCollection,
                  where(filter.columnName, "==", false)
                );
              }
            } else {
              userQuery = query(
                userCollection,
                where(filter.columnName, filter.operator, filter.value)
              );
            }
          } else {
            if (filter.condition === "AND") {
              // AND condition
              if (
                filter.columnName === "followersCount" ||
                filter.columnName === "followingCount"
              ) {
                userQuery = query(
                  userQuery,
                  where(
                    filter.columnName,
                    filter.operator,
                    parseInt(filter.value)
                  )
                );
              } else if (filter.columnName === "verified") {
                if (filter.value.toLowerCase() === "true") {
                  userQuery = query(
                    userQuery,
                    where(filter.columnName, "==", true)
                  );
                } else if (filter.value.toLowerCase() === "false") {
                  userQuery = query(
                    userQuery,
                    where(filter.columnName, "==", false)
                  );
                }
              } else {
                userQuery = query(
                  userQuery,
                  where(filter.columnName, filter.operator, filter.value)
                );
              }
            } else if (filter.condition === "OR") {
              //  OR condition
              if (
                filter.columnName === "followersCount" ||
                filter.columnName === "followingCount"
              ) {
                userQuery = query(
                  userCollection,
                  where(
                    filter.columnName,
                    filter.operator,
                    parseInt(filter.value)
                  )
                );
              } else if (filter.columnName === "verified") {
                if (filter.value.toLowerCase() === "yes") {
                  userQuery = query(
                    userCollection,
                    where(filter.columnName, "==", true)
                  );
                } else if (filter.value.toLowerCase() === "no") {
                  userQuery = query(
                    userCollection,
                    where(filter.columnName, "==", false)
                  );
                }
              } else {
                userQuery = query(
                  userCollection,
                  where(filter.columnName, filter.operator, filter.value)
                );
              }
            }
          }
        }
      });

      const snapshot = await getDocs(userQuery);
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(fetchedData);
    };

    fetchData();
  }, [filters]);

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        id: Math.random().toString(),
        columnName: "",
        operator: "",
        value: "",
        condition: "OR",
      },
    ]);
  };

  const handleFilterChange = (id, key, value) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === id ? { ...filter, [key]: value } : filter
    );
    setFilters(updatedFilters);
  };

  const deleteFilter = (id) => {
    const updatedFilters = filters.filter((filter) => filter.id !== id);
    setFilters(updatedFilters);
  };

  const handleDeleteClick = (id) => {
    deleteFilter(id);
  };

  return (
    <div className="p-5">
      {filters.map((filter, index) => (
        <div
          key={filter.id}
          className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4"
        >
          <select
            value={filter.columnName}
            onChange={(e) =>
              handleFilterChange(filter.id, "columnName", e.target.value)
            }
            className="px-2 py-1 my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Column</option>
            {columns.map((column, columnIndex) => (
              <option key={columnIndex} value={column}>
                {column}
              </option>
            ))}
          </select>
          <select
            value={filter.operator}
            onChange={(e) =>
              handleFilterChange(filter.id, "operator", e.target.value)
            }
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Operator</option>
            {filter.columnName === "followersCount" ||
            filter.columnName === "followingCount" ? (
              <>
                <option value="<">Less Than</option>
                <option value=">">Greater Than</option>
              </>
            ) : filter.columnName === "verified" ? (
              <option value="==">Equals</option>
            ) : (
              <option value="==">Contains</option>
            )}
          </select>
          <input
            type="text"
            value={filter.value}
            onChange={(e) =>
              handleFilterChange(filter.id, "value", e.target.value)
            }
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {index > 0 && (
            <select
              value={filter.condition}
              onChange={(e) =>
                handleFilterChange(filter.id, "condition", e.target.value)
              }
              className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="OR">OR</option>
              <option value="AND">AND</option>
            </select>
          )}
          <button
            onClick={() => handleDeleteClick(filter.id)}
            className="px-2 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={addFilter}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Add Filter
      </button>

      <div className="overflow-x-auto mt-8">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
                Screen Name
              </th>
              <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
                Followers Count
              </th>
              <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
                Following Count
              </th>
              <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
                Location
              </th>
              <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
                Verified
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-200" : "bg-white"}
              >
                <td className="px-4 py-2 border border-gray-300">
                  {item.name}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.screenName}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.followersCount}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.followingCount}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.location}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {item.verified ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilterComponent;

// Referecne Code kindly ignore it.

// "use client";

// import React, { useState, useEffect } from "react";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import { firebaseapp, firestore } from "./firebase-config";
// import {
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   where,
//   deleteDoc,
// } from "firebase/firestore";

// const FilterComponent = () => {
//   const [filters, setFilters] = useState([
//     {
//       id: Math.random().toString(),
//       columnName: "",
//       operator: "",
//       value: "",
//       condition: "OR",
//     },
//   ]);
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchColumns = async () => {
//       const columnsRef = collection(firestore, "users");
//       const snapshot = await getDocs(columnsRef);

//       if (!snapshot.empty) {
//         const columnsData = Object.keys(snapshot.docs[0].data()); // Extract column names
//         setColumns(columnsData);
//       }
//     };

//     fetchColumns();
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       const userCollection = collection(firestore, "users");
//       let userQuery = query(userCollection);

//       filters.forEach(async (filter, index) => {
//         if (filter.columnName && filter.operator && filter.value) {
//           if (index === 0) {
//             if (
//               filter.columnName === "followersCount" ||
//               filter.columnName === "followingCount"
//             ) {
//               userQuery = query(
//                 userCollection,
//                 where(
//                   filter.columnName,
//                   filter.operator,
//                   parseInt(filter.value)
//                 )
//               );
//             } else if (filter.columnName === "verified") {
//               // Handle filtering based on "verified" field
//               if (filter.value.toLowerCase() === "true") {
//                 userQuery = query(
//                   userCollection,
//                   where(filter.columnName, "==", true)
//                 );
//               } else if (filter.value.toLowerCase() === "false") {
//                 userQuery = query(
//                   userCollection,
//                   where(filter.columnName, "==", false)
//                 );
//               }
//             } else {
//               userQuery = query(
//                 userCollection,
//                 where(filter.columnName, filter.operator, filter.value)
//               );
//             }
//           } else {
//             // Handle additional filters with AND or OR conditions
//             if (filter.condition === "AND") {
//               // Apply AND condition
//               if (
//                 filter.columnName === "followersCount" ||
//                 filter.columnName === "followingCount"
//               ) {
//                 userQuery = query(
//                   userQuery,
//                   where(
//                     filter.columnName,
//                     filter.operator,
//                     parseInt(filter.value)
//                   )
//                 );
//               } else if (filter.columnName === "verified") {
//                 if (filter.value.toLowerCase() === "true") {
//                   userQuery = query(
//                     userQuery,
//                     where(filter.columnName, "==", true)
//                   );
//                 } else if (filter.value.toLowerCase() === "false") {
//                   userQuery = query(
//                     userQuery,
//                     where(filter.columnName, "==", false)
//                   );
//                 }
//               } else {
//                 userQuery = query(
//                   userQuery,
//                   where(filter.columnName, filter.operator, filter.value)
//                 );
//               }
//             } else if (filter.condition === "OR") {
//               // Apply OR condition
//               if (
//                 filter.columnName === "followersCount" ||
//                 filter.columnName === "followingCount"
//               ) {
//                 userQuery = query(
//                   userCollection,
//                   where(
//                     filter.columnName,
//                     filter.operator,
//                     parseInt(filter.value)
//                   )
//                 );
//               } else if (filter.columnName === "verified") {
//                 if (filter.value.toLowerCase() === "yes") {
//                   userQuery = query(
//                     userCollection,
//                     where(filter.columnName, "==", true)
//                   );
//                 } else if (filter.value.toLowerCase() === "no") {
//                   userQuery = query(
//                     userCollection,
//                     where(filter.columnName, "==", false)
//                   );
//                 }
//               } else {
//                 userQuery = query(
//                   userCollection,
//                   where(filter.columnName, filter.operator, filter.value)
//                 );
//               }
//             }
//           }
//         }
//       });

//       const snapshot = await getDocs(userQuery);
//       const fetchedData = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setData(fetchedData);
//     };

//     fetchData();
//   }, [filters]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     const userCollection = collection(firestore, "users");
//   //     let userQuery = query(userCollection);

//   //     filters.forEach(async (filter, index) => {
//   //       if (filter.columnName && filter.operator && filter.value) {
//   //         if (index === 0) {
//   //           if (
//   //             filter.columnName === "followersCount" ||
//   //             filter.columnName === "followingCount"
//   //           ) {
//   //             userQuery = query(
//   //               userCollection,
//   //               where(
//   //                 filter.columnName,
//   //                 filter.operator,
//   //                 parseInt(filter.value)
//   //               )
//   //             );
//   //           } else {
//   //             userQuery = query(
//   //               userCollection,
//   //               where(filter.columnName, filter.operator, filter.value)
//   //             );
//   //           }
//   //         } else {
//   //           if (filter.condition === "AND") {
//   //             if (
//   //               filter.columnName === "followersCount" ||
//   //               filter.columnName === "followingCount"
//   //             ) {
//   //               userQuery = query(
//   //                 userQuery,
//   //                 where(
//   //                   filter.columnName,
//   //                   filter.operator,
//   //                   parseInt(filter.value)
//   //                 )
//   //               );
//   //             } else {
//   //               userQuery = query(
//   //                 userQuery,
//   //                 where(filter.columnName, filter.operator, filter.value)
//   //               );
//   //             }
//   //           } else if (filter.condition === "OR") {
//   //             if (
//   //               filter.columnName === "followersCount" ||
//   //               filter.columnName === "followingCount"
//   //             ) {
//   //               userQuery = query(
//   //                 userCollection,
//   //                 where(
//   //                   filter.columnName,
//   //                   filter.operator,
//   //                   parseInt(filter.value)
//   //                 )
//   //               );
//   //             } else {
//   //               userQuery = query(
//   //                 userCollection,
//   //                 where(filter.columnName, filter.operator, filter.value)
//   //               );
//   //             }
//   //           }
//   //         }
//   //       }
//   //       // const snapshot = await getDocs(userQuery);
//   //       // const fetchedData = snapshot.docs.map((doc) => ({
//   //       //   id: doc.id,
//   //       //   ...doc.data(),
//   //       // }));
//   //       // setData(fetchedData)
//   //     });
//   //     const snapshot = await getDocs(userQuery);
//   //     const fetchedData = snapshot.docs.map((doc) => ({
//   //       id: doc.id,
//   //       ...doc.data(),
//   //     }));
//   //     setData(fetchedData);
//   //   };

//   //   fetchData();
//   // }, [filters]);

//   const addFilter = () => {
//     setFilters([
//       ...filters,
//       {
//         id: Math.random().toString(),
//         columnName: "",
//         operator: "",
//         value: "",
//         condition: "OR",
//       },
//     ]);
//   };

//   const handleFilterChange = (id, key, value) => {
//     const updatedFilters = filters.map((filter) =>
//       filter.id === id ? { ...filter, [key]: value } : filter
//     );
//     setFilters(updatedFilters);
//   };

//   const deleteFilter = (id) => {
//     const updatedFilters = filters.filter((filter) => filter.id !== id);
//     setFilters(updatedFilters);
//   };

//   const handleDeleteClick = (id) => {
//     deleteFilter(id);
//   };

//   return (
//     <div className="p-4">
//       {filters.map((filter, index) => (
//         <div key={filter.id} className="flex items-center space-x-4">
//           <select
//             value={filter.columnName}
//             onChange={(e) =>
//               handleFilterChange(filter.id, "columnName", e.target.value)
//             }
//             className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//           >
//             <option value="">Select Column</option>
//             {columns.map((column, columnIndex) => (
//               <option key={columnIndex} value={column}>
//                 {column}
//               </option>
//             ))}
//           </select>
//           <select
//             value={filter.operator}
//             onChange={(e) =>
//               handleFilterChange(filter.id, "operator", e.target.value)
//             }
//             className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//           >
//             <option value="">Select Operator</option>
//             {filter.columnName === "followersCount" ||
//             filter.columnName === "followingCount" ? (
//               <>
//                 <option value="<">Less Than</option>
//                 <option value=">">Greater Than</option>
//               </>
//             ) : filter.columnName === "verified" ? (
//               <option value="==">Equals</option>
//             ) : (
//               <option value="==">Contains</option>
//             )}
//             {/* <option value="==">Equal To</option>
//           <option value="<">Less Than</option>
//             <option value=">">Greater Than</option> */}
//           </select>
//           <input
//             type="text"
//             value={filter.value}
//             onChange={(e) =>
//               handleFilterChange(filter.id, "value", e.target.value)
//             }
//             className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//           />
//           {index > 0 && (
//             <select
//               value={filter.condition}
//               onChange={(e) =>
//                 handleFilterChange(filter.id, "condition", e.target.value)
//               }
//               className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
//             >
//               <option value="OR">OR</option>
//               <option value="AND">AND</option>
//             </select>
//           )}
//           <button
//             onClick={() => handleDeleteClick(filter.id)}
//             className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//       <button
//         onClick={addFilter}
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
//       >
//         Add Filter
//       </button>

//       <div className="overflow-x-auto p-20 ">
//         {/* <div>
//         <FilterComponent />
//       </div> */}
//         <table className="table-auto min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
//                 Name
//               </th>
//               <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
//                 Screen Name
//               </th>
//               <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
//                 Followers Count
//               </th>
//               <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
//                 Following Count
//               </th>
//               <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
//                 Location
//               </th>
//               <th className="px-4 py-2 text-left bg-gray-100 border border-gray-300">
//                 Verified
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr
//                 key={index}
//                 className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//               >
//                 <td className="px-4 py-2 border border-gray-300">
//                   {item.name}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-300">
//                   {item.screenName}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-300">
//                   {item.followersCount}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-300">
//                   {item.followingCount}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-300">
//                   {item.location}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-300">
//                   {item.verified ? "Yes" : "No"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;
