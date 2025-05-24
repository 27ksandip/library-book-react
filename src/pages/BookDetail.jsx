import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import axiosClient from "../axiosClient";

const BookDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [book, setBook] = useState(null);
  const getBook = async () => {
    try {
      const response = await axiosClient.get(
        `/books/${id}`
      );
      setBook(response?.data);
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBook();
  }, []);
  if (isLoading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>{book?.title}</h2>
      <p>Author: {book?.author}</p>
      <span>Publication: {book?.publication_year}</span>
    </div>
  );
};

export default BookDetail;
