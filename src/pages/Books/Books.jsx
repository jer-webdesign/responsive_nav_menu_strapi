import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Books.css"; // optional styling

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const STRAPI_URL = "http://localhost:1337"; // Replace with live URL if needed
  const STRAPI_URL = "https://loved-rhythm-7c69d3a485.strapiapp.com";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${STRAPI_URL}/api/books?populate=*`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("Books API Response:", data);
        setBooks(data.data || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError(err.message);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookClick = (bookID) => {
    navigate(`/books/${bookID}`);
  };

  const handleAddToCart = (book) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isAlreadyInCart = existingCart.some(item => item.id === book.id);
    if (!isAlreadyInCart) {
      localStorage.setItem("cart", JSON.stringify([...existingCart, book]));
      alert(`Added "${book.title}" to cart!`);
    } else {
      alert(`"${book.title}" is already in your cart.`);
    }
  };

  // if (loading) {
  //   return <main style={{ padding: "2rem" }}><p>Loading books...</p></main>;
  // }

  // if (loading) {
  //   return (
  //     <main>
  //       <div className="spinner"></div>
  //     </main>
  //   );
  // }  

  if (error) {
    return <main style={{ padding: "2rem" }}><p>Error loading books: {error}</p></main>;
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h2>All Books</h2>
      <div className="books-container">
        {books.map((book) => {
          if (!book) return null;

          // const cover = book.filename
          //   ? `http://localhost:1337/${book.filename}`
          //   : null;  
          const cover = book.filename
            ? `https://loved-rhythm-7c69d3a485.media.strapiapp.com/${book.filename}`
            : null;            

          return (
            <div key={book.id} className="book-card">
              {cover ? (
                <img
                  src={cover}
                  alt={book.title || "Book cover"}
                  onClick={() => handleBookClick(book.id)}
                  style={{
                    cursor: "pointer",
                    width: "200px",
                    height: "250px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  onError={(e) => {
                    console.warn("Image failed to load:", cover);
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "200px",
                    height: "250px",
                    backgroundColor: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                  }}
                  onClick={() => handleBookClick(book.id)}
                >
                  No Cover
                </div>
              )}
              <h4>{book.title || "Unknown Title"}</h4>
              <p><em>{book.author || "Unknown Author"}</em></p>
              <p>${book.price_cad?.toFixed(2) || "0.00"} CAD</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(book)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}