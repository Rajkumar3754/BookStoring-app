import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveBook = async () => {
    // Validate that publishYear is not empty
    if (!publishYear) {
      alert('Please enter the publish year.');
      return;
    }

    setLoading(true);
    const data = {
      title,
      author,
      publishYear
    };

    try {
      await axios.post('https://backend-7pfi.onrender.com/books', data);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      alert('An error occurred. Please check the console.');
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center" style={{ background: 'linear-gradient(to bottom right, #4b6cb7, #182848)', minHeight: '100vh' }}>
      <div className="w-full max-w-screen-md">
        <BackButton />
        <h1 className="text-3xl my-4">Create Book</h1>
        {loading && <Spinner />}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4">
          <div className="my-4">
            <label className="text-xl">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <div className="my-4">
            <label className="text-xl">Publish Year</label>
            <input
              type="text"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="border-gray-500 px-4 py-2 w-full"
            />
          </div>

          <button className="p-2 bg-sky-300 m-8 self-start" onClick={handleSaveBook}>
            Save Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
