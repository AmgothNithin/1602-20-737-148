import React, { useEffect, useState } from 'react';
import { fetchAllTrains } from '../api'; // Use the API function you've defined

const AllTrainsPage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch data from API and set it to state
    const fetchData = async () => {
      const response = await fetchAllTrains();
      setTrains(response);
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* Display the list of trains */}
      {trains.map((train) => (
        <div key={train.trainNumber}>{train.trainName}</div>
      ))}
    </div>
  );
};

export default AllTrainsPage;
