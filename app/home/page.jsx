// This code is only for refrence kindly ignore it.

// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { database, firebaseapp } from "../components/firebase-config";
// // import { get, ref } from "firebase/database";
// // export default function Home() {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       const dbRef = await ref(database, "users");
// //       get(dbRef).then((snapshot) => {
// //         const dataFromDB = snapshot.val();
// //         // Convert the object into an array if needed
// //         const dataArray = Object.values(dataFromDB);
// //         setData(dataArray);
// //       });
// //     };

// //     fetchData();
// //   }, [data]);

// //   return (
// //     <div>
// //       <h1>My Next.js App with Firebase Realtime Database</h1>
// //       <ul>
// //         {data.map((item) => (
// //           <ul key={item.id}>
// //             <li>{item.name}</li>
// //             <li>{item.title}</li>
// //             <li>{item.subTitle}</li>
// //           </ul>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // pages/index.js
// "use client";
// import React, { useEffect, useState } from "react";
// import { database, firebaseapp } from "../components/firebase-config";
// import { get, ref, query, orderByChild } from "firebase/database"; // Import query and orderByChild
// import FilterComponent from "../components/FilterComponent";

// export default function Home() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async (queryParam) => {
//       // Modify to accept a query parameter
//       const dbRef = ref(database, "users");
//       const dbQuery = query(dbRef, orderByChild("name")); // Create a query object with orderByChild

//       get(dbQuery).then((snapshot) => {
//         const dataFromDB = snapshot.val();
//         const dataArray = dataFromDB ? Object.values(dataFromDB) : []; // Check if dataFromDB is null
//         setData(dataArray);
//       });
//     };

//     fetchData(); // Call fetchData without a query initially
//   }, []); // Remove data dependency as we don't want to refetch on data change

//   return (
//     <div>
//       <h1>My Next.js App with Firebase Realtime Database</h1>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Title</th>
//             <th>Sub Title</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.title}</td>
//               <td>{item.subTitle}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// Code starts from here

import React from "react";
import FilterComponent from "../components/FilterComponent";

const page = () => {
  return (
    <div>
      <FilterComponent />
    </div>
  );
};

export default page;
