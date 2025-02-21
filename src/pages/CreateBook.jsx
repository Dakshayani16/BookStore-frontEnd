import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FaBook } from 'react-icons/fa';
import { API_BASE_URL } from '../../config'; // Importing API URL

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .post(`${API_BASE_URL}books`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created Successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error! Something went wrong.', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-gray-100'>
      <div className='self-start p-4'>
        <BackButton />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mt-4 flex items-center gap-2">
  <FaBook className="text-blue-500" /> Create Book
</h1>

      {loading && <Spinner />}

      <div className='bg-white shadow-lg rounded-xl w-full max-w-xl p-10 border-t-4 border-blue-500 mt-6'>
        <div className='mb-6'>
          <label className='text-xl text-gray-600 block mb-2'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='mb-6'>
          <label className='text-xl text-gray-600 block mb-2'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='mb-6'>
          <label className='text-xl text-gray-600 block mb-2'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div className='flex justify-center'>
          <button
            className='px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all'
            onClick={handleSaveBook}
          >
            Save Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
