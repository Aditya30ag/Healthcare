import { useState, useEffect } from "react";
import axios from "axios";

const useHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHospitals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/hospital/gethospitals"
        );
        setHospitals(response.data.hospitals);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getHospitals();
  }, []);

  return { hospitals, loading, error };
};

export default useHospitals;
