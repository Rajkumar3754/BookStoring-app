import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const EditBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3500/books/${id}`);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert(`An error occurred. Please check the console.`);
        console.log(error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleEditBook = async () => {
    if (!publishYear) {
      alert('Please enter the publish year.');
      return;
    }

    setLoading(true);
    const data = {
      title,
      author,
      publishYear,
    };

    try {
      await axios.put(`http://localhost:3500/books/${id}`, data);
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      alert(`An error occurred. Please check the console.`);
      console.error('Error editing book:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center" style={{ background: 'linear-gradient(to bottom right, #f43b47, #453a94)' }}>
      <div className="p-4 w-full max-w-screen-md">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Book</h1>
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

          <button className="p-2 bg-sky-300 m-8 self-start" onClick={handleEditBook}>
            Save Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBooks;
