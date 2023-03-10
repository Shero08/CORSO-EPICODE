import { useState, useEffect } from "react";

const useFetch = ({ url, headers }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    fetch(url, { headers })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [url]);
  
  return { data, loading, error };
};

export default useFetch;