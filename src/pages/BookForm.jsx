import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate, useParams } from "react-router";
import axiosClient from "../axiosClient";

const BookFrom = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publication, setPublication] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const createBook = async () => {
    // check validation
    let validationErrors = {};
    if (!title) validationErrors.title = "Book title is required";
    if (!author) validationErrors.author = "Author is required";
    if (!publication)
      validationErrors.publication = "Publication year is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("publication_year", publication);

    try {
      // if has id update book
      if (id) {
        const response = await axiosClient.post(
          `/books/${id}?_method=PUT`,
          formData
        );
        setSuccessMessage("Book updated successfully!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        // create book
        const response = await axiosClient.post("/books", formData);
        setSuccessMessage("Book created successfully!");
      }
    } catch (error) {
      console.error("Error creating book", error);
    } finally {
      setIsLoading(false);
      setTitle("");
      setAuthor("");
      setPublication("");
    }
  };

  useEffect(() => {
    if (id) {
      const getBook = async () => {
        try {
          const response = await axiosClient.get(
            `http://192.168.101.3:8000/api/books/${id}`
          );
          const { title, author, publication_year } = response.data;
          setTitle(title);
          setAuthor(author);
          setPublication(publication_year);
        } catch (error) {
          console.error("Error loading book", error);
        }
      };
      getBook();
    }
  }, [id]);

  return (
    <>
      <Link to={"/"}>
        <Button className="mb-3">Book List</Button>
      </Link>
      <Form.Control
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Book Title"
      />
      {errors.title && <small className="text-danger">{errors.title}</small>}
      <Form.Control
        className="mt-3"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
      />
      {errors.author && <small className="text-danger">{errors.author}</small>}
      <Form.Control
        className="mt-3"
        value={publication}
        type="number"
        onChange={(e) => setPublication(e.target.value)}
        placeholder="Publication Year"
        min="1500"
        max={new Date().getFullYear()}
      />
      {errors.publication && (
        <small className="text-danger">{errors.publication}</small>
      )}
      {isLoading && (
        <Spinner className="mt-3" animation="border" variant="primary" />
      )}
      {successMessage && <p className="text text-success">{successMessage}</p>}
      <br></br>

      <Button onClick={createBook}>{id ? "Update Book" : "Create Book"}</Button>
    </>
  );
};

export default BookFrom;
