import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe`);
        setDetails(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>Oops! Could not fetch recipe details.</div>
    );
  }

  return (
    <div>
      <h2>{details.name}</h2>
      <div>
        <p>{details.description}</p>
        <p>{details.servingSize}</p>
        <p>{details.notes}</p>
      </div>
    </div>
  );
};

export default Recipe;
