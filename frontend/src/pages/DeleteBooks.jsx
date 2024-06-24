// import React, { useState, useEffect } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const DeleteBooks = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const handleDeleteBook = async () => {
//     setLoading(true);
//     try {
//       await axios.delete(`https://backend-7pfi.onrender.com/books/${id}`);
//       setLoading(false);
//       navigate('/');
//     } catch (error) {
//       setLoading(false);
//       alert(`An error happened..Please check console`);
//       console.log(error);
//     }
//   };

//   return (
//     <div className='p-4'>
//       <BackButton />
//       <h1 className='text-3xl my-4'>Delete Book</h1>
//       {loading ? <Spinner /> : ""}
//       <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
//         <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>
//         <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook}>
//           Yes, Delete it
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteBooks;

import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError('Invalid book ID.');
    }
  }, [id]);

  const handleDeleteBook = async () => {
    if (!id) {
      setError('Invalid book ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await axios.delete(`https://backend-7pfi.onrender.com/books/${id}`);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError('An error occurred while trying to delete the book. Please check the console for more details.');
      console.log('Error details:', error);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading && <Spinner />}
      {error && <div className='text-red-600'>{error}</div>}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full' onClick={handleDeleteBook} disabled={loading}>
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
