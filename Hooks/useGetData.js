import { useState, useEffect } from "react";
import axios from "axios";

function useGetData(url, timeStamp){
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    const source = axios.CancelToken.source();

    axios.get(url, {cancelToken: source.token})
    .then(res => {
      setLoading(false);
      setData(res.data)
    })
    .catch(err => {
      setLoading(false);
      setError('Error u fetche')
    })
  
    return () => {
      source.cancel();
    }
  }, [url, timeStamp])

  return { data, loading, error }
  
}

export default useGetData