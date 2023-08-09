import React, { useEffect, useState } from 'react';
import { fetchSingleTrain } from '../api'; // Use the API function you've defined
import { useParams } from 'react-router-dom';

const SingleTrainPage = () => {
  const [train, setTrain] = useState({});
  const { trainNumber } = useParams();

  useEffect(() => {
    // Fetch data for the specific train from API and set it to state
    const fetchData = async () => {
      const response = await fetchSingleTrain(trainNumber);
      setTrain(response);
    };
    fetchData();
  }, [trainNumber]);

  return (
    <div>
      {/* Display the details of the single train */}
      <h2>{train.trainName}</h2>
      {/* Display other train details */}
    </div>
  );
};

export default SingleTrainPage;
