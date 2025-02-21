import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineTable } from "react-icons/ai";
import { BsGrid3X3 } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/Home/BooksCard";
import BooksTable from "../components/Home/BooksTable";
import { API_BASE_URL } from '../../config'; // Importing API URL

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}books`)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Toggle View Buttons */}
      <div className="flex justify-center items-center gap-4 my-4">
        <button
          className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-all duration-300 ${
            showType === "table"
              ? "bg-sky-600 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setShowType("table")}
        >
          <AiOutlineTable className="text-xl" />
          Table View
        </button>
        <button
          className={`px-4 py-2 flex items-center gap-2 rounded-lg transition-all duration-300 ${
            showType === "card"
              ? "bg-sky-600 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setShowType("card")}
        >
          <BsGrid3X3 className="text-xl" />
          Card View
        </button>
      </div>

      {/* Title & Add Button */}
      <div className="flex justify-between items-center my-6">
        <h1 className="text-4xl font-bold text-gray-800">📚 Books List</h1>
        <Link
          to="/books/create"
          className="text-white bg-sky-600 hover:bg-sky-700 transition-all duration-300 p-3 rounded-full shadow-lg"
        >
          <MdOutlineAddBox className="text-4xl" />
        </Link>
      </div>

      {/* Content Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
