import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";
import axiosClient from "../axiosClient";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchBook = async () => {
    try {
      const response = await axiosClient.get("/books");
      setBooks(response?.data.data);
    } catch (error) {
      setError("something went wrong, please check api");
    } finally {
      setIsLoading(false);
    }
  };

  const bookDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await axiosClient.delete(
        `/books/${id}`
      );

      // remove book item from books
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
      setMessage(response?.data.message);
    } catch (error) {
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
      // remove flash message
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);

  if (isLoading) return <Spinner animation="border" variant="primary" />;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <Link to={`books`}>
        <Button className="btn btn-sm mb-2 float-end">Add New Book</Button>
      </Link>

      {message ? <p className="text text-success">{message}</p> : ""}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.publication_year}</td>
              <td>
                <Button
                  onClick={() => bookDelete(item.id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  Delete
                </Button>
                <Link to={`books/${item.id}/edit`}>
                  <Button className="btn btn-primary btn-sm me-2">Edit</Button>
                </Link>
                <Link to={`books/${item.id}`}>
                  <Button className="btn btn-info btn-sm">View</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookList;
