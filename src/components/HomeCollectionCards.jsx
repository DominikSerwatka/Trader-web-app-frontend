// import React from 'react';
// import CollectionCard from './CollectionCard';
// import spaces from '../space_categories.json';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// function HomeCollectionCards() {
//   var spacesToShow = spaces;

//   const defaultSpacesToShowIndices = [0, 4];

//   const [spacesToShowIndices, setSpacesToShow] = useState(defaultSpacesToShowIndices);

//   // console.log(spacesToShowIndices);
//   spacesToShow = spaces.slice(spacesToShowIndices[0], spacesToShowIndices[1]);

//   return (
//     <>
//       <section className="relative px-4 py-8 bg-gray-50">
//         <h2 className="text-3xl font-bold text-center mb-10">Meble do twojego wnętrza</h2>
//         {/* <!-- Strzałka lewa --> */}
//         <button
//           onClick={() =>
//             setSpacesToShow((prevState) => {
//               if (prevState[0] > 0) {
//                 return [prevState[0] - 1, prevState[1] - 1];
//               } else {
//                 return prevState;
//               }
//             })
//           }
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-200"
//           aria-label="Poprzednie"
//         >
//           <i className="fa-solid fa-chevron-left"></i>
//         </button>

//         {/* <!-- Kontener z kartami --> */}
//         <div className="flex gap-6 overflow-hidden justify-center">
//           {spacesToShow.map((space) => (
//             <CollectionCard key={space.id}>
//               <img
//                 src={space.picture}
//                 alt={space.name}
//                 className="w-full h-60 object-cover rounded-t-xl"
//               />
//               <div className="p-4 text-center">
//                 <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
//                 <Link
//                   to={`/products?space=${space.linkName}`}
//                   className="text-dark font-medium hover:underline"
//                 >
//                   Zobacz meble
//                 </Link>
//               </div>
//             </CollectionCard>
//           ))}
//         </div>

//         {/* <!-- Strzałka prawa --> */}
//         <button
//           onClick={() =>
//             setSpacesToShow((prevState) => {
//               if (prevState[1] < spaces.length) {
//                 return [prevState[0] + 1, prevState[1] + 1];
//               } else {
//                 return prevState;
//               }
//             })
//           }
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-200"
//           aria-label="Następne"
//         >
//           <i className="fa-solid fa-chevron-right"></i>
//         </button>
//       </section>
//     </>
//   );
// }

// export default HomeCollectionCards;
