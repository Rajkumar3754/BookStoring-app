import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const HomeBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://backend-7pfi.onrender.com/books');
        console.log('Response data:', response.data); // Log response data for debugging
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error('Unexpected response structure:', response.data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className='p-4 bg-gradient-to-br from-purple-400 to-pink-400 min-h-screen'>
      {/* Gradient background color */}
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl cursor-pointer' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {books && books.length > 0 ? (
            books.map((book, index) => (
              <div
                key={book._id}
                className='bg-white shadow-lg rounded-md overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer'
                style={{ backgroundColor: index % 2 === 0 ? '#FECACA' : '#BEE3DB' }}
              >
                <div className='p-4'>
                  <h2 className='text-2xl font-semibold text-gray-800'>{book.title}</h2>
                  <p className='text-gray-600 mb-2'>Author: {book.author}</p>
                  <p className='text-gray-600'>Publish Year: {book.publishYear}</p>
                </div>
                <div className='flex justify-end p-4'>
                  <Link to={`/books/details/${book._id}`} className='text-green-800 mr-2'>
                    <BsInfoCircle className='text-xl cursor-pointer' />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} className='text-yellow-600 mr-2'>
                    <AiOutlineEdit className='text-xl cursor-pointer' />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} className='text-red-600'>
                    <MdOutlineDelete className='text-xl cursor-pointer' />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center'>No books available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeBooks;
