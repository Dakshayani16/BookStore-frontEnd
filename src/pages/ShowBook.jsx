import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { API_BASE_URL } from '../../config'; // Importing API URL

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}books/${id}`)
      .then((response) => {
        console.log('Component is rendering...');
        console.log('Book data:', response.data);
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-gray-100 p-6'>
      <div className='self-start p-4'>
        <BackButton />
      </div>

      <h1 className='text-4xl font-bold text-gray-800 mt-4'>Book Details</h1>

      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-white shadow-lg rounded-xl w-full max-w-xl p-10 border-t-4 border-blue-500 mt-6'>
          <div className='mb-6'>
            <span className='text-xl text-gray-600 font-semibold block'>ID</span>
            <span className='text-lg text-gray-800'>{book._id}</span>
          </div>

          <div className='mb-6'>
            <span className='text-xl text-gray-600 font-semibold block'>Title</span>
            <span className='text-lg text-gray-800'>{book.title}</span>
          </div>

          <div className='mb-6'>
            <span className='text-xl text-gray-600 font-semibold block'>Author</span>
            <span className='text-lg text-gray-800'>{book.author}</span>
          </div>

          <div className='mb-6'>
            <span className='text-xl text-gray-600 font-semibold block'>Publish Year</span>
            <span className='text-lg text-gray-800'>{book.publishYear}</span>
          </div>

          <div className='mb-6'>
            <span className='text-xl text-gray-600 font-semibold block'>Created At</span>
            <span className='text-lg text-gray-800'>{new Date(book.createdAt).toLocaleString()}</span>
          </div>

          <div className='mb-6'>
            <span className='text-xl text-gray-600 font-semibold block'>Last Updated</span>
            <span className='text-lg text-gray-800'>{new Date(book.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
