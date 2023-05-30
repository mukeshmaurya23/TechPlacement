import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (e) {
        setError(e);
      }
    }
    fetchData();
  }, []);
  return { data, loading, error };
};
export default useFetch;
