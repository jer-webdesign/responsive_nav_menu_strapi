// src/components/BookDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BookDetail.css";

export default function BookDetail() {
  const { bookID } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch("https://loved-rhythm-7c69d3a485.strapiapp.com/api/books?populate=*");
        // const res = await fetch("http://localhost:1337/api/books?populate=*");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();

        // Find the correct book by ID
        const foundBook = data.data.find((b) => String(b.id) === bookID);
        if (foundBook) {
          setBook(foundBook);
        } else {
          setError("Book not found");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(err.message);
      }
    };

    fetchBook();
  }, [bookID]);

  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Loading...</p>;

  // Handle image from Strapi media library
  // const cover = book.media_url?.url
  //   ? `http://localhost:1337${book.media_url.url}`
  //   : null;
  // const cover = book.media_url?.url
  //   ? `https://loved-rhythm-7c69d3a485.strapiapp.com/uploads/${book.media_url.url}`
  //   : null;  
  const cover = book.filename
    ? `https://loved-rhythm-7c69d3a485.media.strapiapp.com/${book.filename}`
    : null;       

  return (
    <div className="book-detail-container">
      <div className="book-detail">
        {cover && (
          <img
            src={cover}
            alt={`Cover of ${book.title}`}
            className="book-cover"
          />
        )}
        <div className="book-info">
          <h3>{book.title}</h3>
          {book.subtitle && <h5>{book.subtitle}</h5>}
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Published Date:</strong> {book.published_date}</p>
          <p><strong>Pages:</strong> {book.number_of_pages}</p>
          <p><strong>ISBN-13:</strong> {book.ISBN_13}</p>
          <p><strong>ISBN-10:</strong> {book.ISBN_10}</p>
          <p><strong>Price:</strong> ${book.price_cad?.toFixed(2)} CAD</p>
          <p><strong>Rating:</strong> {book.average_rating} ({book.rating_count} reviews)</p>
          {book.isNewRelease && <span className="badge new-release">New Release</span>}
          {book.isBestSeller && <span className="badge best-seller">Best Seller</span>}
        </div>
      </div>
    </div>
  );
}
