import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Recipe = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  // const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe`);
        setName(data.name);
      } catch (err) {
        setError(err);
      }
      // setLoadingState(false);
    };

    fetchData();
  }, []);

  // if (loadingState) {
  //   return (
  //     <div>Loading</div>
  //   );
  // }

  if (error) {
    return (
      <div>Oops! Could not fetch recipe details.</div>
    );
  }

  return (
    <div>
      {name}
    </div>
  );
};

export default Recipe;
