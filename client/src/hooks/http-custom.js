import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";
export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await axios({
          url,
          method,
          data: body,
          headers,
          signal: httpAbortCtrl.signal,
        });
        setIsLoading(false);
        return response.data;
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Something went wrong");
        throw err;
      }
    },
    []
  );
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  const clearError = () => {
    setError(null);
  };
  return { isLoading, error, sendRequest, clearError };
};
