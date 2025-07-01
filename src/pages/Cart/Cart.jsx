// src/pages/Cart/Cart.jsx
import React, { useEffect, useState } from "react";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Strapi API URL - same as in Books.jsx
  const STRAPI_URL = "https://loved-rhythm-7c69d3a485.strapiapp.com";

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <h3>There are currently no items in your shopping cart.</h3>
      ) : (
        <ul className="cart-items">
          {cartItems.map((item, index) => {
            // Updated image retrieval to use Strapi API - following Books.jsx pattern
            const cover = item.filename
              ? `https://loved-rhythm-7c69d3a485.media.strapiapp.com/${item.filename}`
              : null;

            return (
              <li key={index} className="cart-item">
                {cover ? (
                  <img 
                    src={cover} 
                    alt={`Cover of ${item.title}`} 
                    width="120" 
                    height="auto"
                    onError={(e) => {
                      console.warn("Image failed to load:", cover);
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "120px",
                      height: "150px",
                      backgroundColor: "#eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      fontSize: "12px",
                      color: "#666"
                    }}
                  >
                    No Cover
                  </div>
                )}
                <div>
                  <div className="cart-item-title"><strong>{item.title}</strong></div>
                  <div className="cart-item-author">{item.author}</div>
                  <div>${item.price_cad?.toFixed(2) || "0.00"} CAD</div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
// // src/pages/Cart/Cart.jsx
// import React, { useEffect, useState } from "react";
// import "./Cart.css";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

//   const removeFromCart = (indexToRemove) => {
//     const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
//     setCartItems(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   return (
//     <div className="cart-container">
//       <h2>Your Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <h3>There are currently no items in your shopping cart.</h3>
//       ) : (
//         <ul className="cart-items">
//           {cartItems.map((item, index) => {
//             const cover = `${import.meta.env.BASE_URL}assets/images/book-covers/${item.filename}`;
//             return (
//               <li key={index} className="cart-item">
//                 <img src={cover} alt={`Cover of ${item.title}`} width="120" height="auto" />
//                 <div>
//                   <div className="cart-item-title"><strong>{item.title}</strong></div>
//                   <div className="cart-item-author">{item.author}</div>
//                   <div>${item.price_cad.toFixed(2)} CAD</div>
//                 </div>
//                 <button className="remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
//               </li>
//             );
//           })}
//         </ul>
//       )}
//     </div>
//   );
// }

