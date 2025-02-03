// // src/hooks/useApi.js
// import { useState, useCallback } from 'react';
// import api from '../api/api'; // Import the axios instance

// // Custom hook for GET requests
// export const useFetch = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchData = async (url) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.get(url);
//       return response.data;
//     } catch (err) {
//       setError(err.response?.data || err.message);
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//       }, 3000);
//     }
//   };

//   return { loading, error, fetchData };
// };

// // Custom hook for POST requests
// export const usePost = () => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const postData = async (url, body, config = { headers: { 'Content-Type': 'application/json' } }) => {
//     console.log('Backend Post Call');
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.post(url, body, config);
//       return response.data;
//     } catch (err) {
//       setError(err.response?.data || err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { loading, error, postData };
// };

// // Custom hook for PUT requests
// export const usePut = (url) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const putData = useCallback(async (body) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.put(url, body);
//       return response.data;
//     } catch (err) {
//       setError(err.response?.data || err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [url]);

//   return { loading, error, putData };
// };

// // Custom hook for DELETE requests
// export const useDelete = (url) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const deleteData = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await api.delete(url);
//       return response.data;
//     } catch (err) {
//       setError(err.response?.data || err.message);
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   }, [url]);

//   return { loading, error, deleteData };
// };
