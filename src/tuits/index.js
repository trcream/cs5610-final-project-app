//Modyifying for hw5- says tuits-list.js file which we did not have before
import React, { useEffect } from "react"; // import tuitsArray from "./tuits.json";
import { useDispatch, useSelector } from "react-redux";

import TuitItem from "./tuit-item";
import { findTuitsThunk } from "../services/tuits-thunks";

const TuitList = () => {
  // Grabbing form the store .json file

  const { tuits, loading } = useSelector((state) => state.tuits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findTuitsThunk());
  }, []);

  return (
    <ul className="list-group">
      {loading && <li className="list-group-item">Loading...</li>}
      {tuits.map((tuit) => (
        // Extracting data from the store - tuits is the name of the key
        // Data rerenders when the store changes
        <TuitItem key={tuit._id} tuit={tuit} />
      ))}
    </ul>
  );
};
export default TuitList;

// import React from "react";
// // import tuitsArray from "./tuits.json";
// import TuitItem from "./tuit-item";
// import { useSelector } from "react-redux";

// const TuitList = () => {
//   // Grabbing form the store .json file
//   const tuits = useSelector((state) => state.tuits.tuits);
//   return (
//     <ul className="list-group">
//       {tuits.map((tuit) => (
//         // Extracting data from the store - tuits is the name of the key
//         // Data rerenders when the store changes
//         <TuitItem key={tuit._id} tuit={tuit} />
//       ))}
//     </ul>
//   );
// };
// export default TuitList;
