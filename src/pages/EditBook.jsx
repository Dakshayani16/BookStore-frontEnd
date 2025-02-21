import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useSnackbar } from "notistack";
import { API_BASE_URL } from '../../config'; // Importing API URL

import { useNavigate, useParams } from "react-router-dom";
import {FaEdit } from 'react-icons/fa';
const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error fetching book details!", { variant: "error" });
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios
      .put(`${API_BASE_URL}books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited Successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error updating book!", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="self-start p-4">
        <BackButton />
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mt-4 flex items-center gap-2">
  <FaEdit className="text-blue-500" /> Edit Book
</h1>

      {loading && <Spinner />}

      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-10 border-t-4 border-blue-500 mt-6">
        <div className="mb-6">
          <label className="text-xl text-gray-600 block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="text-xl text-gray-600 block mb-2">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="text-xl text-gray-600 block mb-2">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-300 px-4 py-2 w-full rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all"
            onClick={handleEditBook}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
