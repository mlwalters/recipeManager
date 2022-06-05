// import axios from 'axios';
import React from 'react'; // useParams
// import React, { useEffect, useState } from 'react'; // useParams

// import LoadingDisplay from './sharedComponents/LoadingDisplay';

const GroceryList = () => (
  <div>
    <h2>Hola</h2>

  </div>
);
// const [groceryList, setGroceryList] = useState([]);
// const [loadingState, setLoadingState] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/ShoppingList`);
//       setGroceryList(data);
//     } catch (err) {
//       setError(err);
//     }
//     setLoadingState(false);
//   };
//   fetchData();
// }, []);

// if (loadingState) {
//   return (
//     <LoadingDisplay />
//   );
// }

// if (error) {
//   return (
//     <div>Oops! Could not fetch recipe card.</div>
//   );
// }

export default GroceryList;
