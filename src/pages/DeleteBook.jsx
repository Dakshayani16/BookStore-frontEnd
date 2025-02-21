import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { API_BASE_URL } from '../../config'; // Importing API URL

import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';
const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`${API_BASE_URL}books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted Successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((e) => {
        setLoading(false);
        enqueueSnackbar("Error deleting book!", { variant: "error" });
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <div className="self-start p-4">
        <BackButton />
      </div>

     
<h1 className="text-4xl font-bold text-gray-800 mt-4 flex items-center gap-2">
  <FaTrash className="text-red-600" /> Delete Book
</h1>
      {loading && <Spinner />}

      <div className="bg-white shadow-lg rounded-xl w-full max-w-xl p-10 border-t-4 border-red-500 mt-6">
        <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">
          Are you sure you want to delete this book?
        </h3>

        <div className="flex gap-6 justify-center">
          <button
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-400 transition-all"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition-all"
            onClick={handleDeleteBook}
          >
            Yes, Delete it
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
