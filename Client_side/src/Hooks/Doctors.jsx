import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useDoctors = () => {
  const { hospitalId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!hospitalId) return; 
    const getDoctors = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/hospital/get-doctors/${hospitalId}`
        );
        setDoctors(response.data.doctors); 
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, [hospitalId]);
  return { doctors, loading, error };
};

export default useDoctors;
