import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe`);
        setDetails(data[0]);
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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="https://images.unsplash.com/photo-1621955511667-e2c316e4575d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2hlZXNlY2FrZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60" />
      <Card.Body>
        <Card.Title>{details.name}</Card.Title>
        <Card.Text>{details.description}</Card.Text>
        <Card.Text>
          Serving size:
          {details.servingSize}
        </Card.Text>
        <Button variant="primary">Go to Recipe</Button>
      </Card.Body>
    </Card>
    // <div>
    //   <h2>{details.name}</h2>
    //   <div>
    //     <p>{details.description}</p>
    //     <p>{details.servingSize}</p>
    //     <p>{details.notes}</p>
    //   </div>
    // </div>
  );
};

export default Recipe;
