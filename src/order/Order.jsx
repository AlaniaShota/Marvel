import React from "react";
import { useStore } from "../state/state";
import "./Order.scss";
import { Link } from "react-router-dom";
import { Button } from "../components/button/index";

export const Order = () => {
  const wishlist = useStore((state) => state.wishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const updateQuantity = useStore((state) => state.updateQuantity);

  const total = wishlist.reduce((acc, { comic, quantity }) => {
    return acc + comic.prices[0].price * quantity;
  }, 0);

  return (
    <div className="order-content">
      <div className="order-content-wishlist">
        {wishlist.map(({ comic, quantity }, index) => (
          <div key={`${comic.id}-${index}`} className="order-wishlist-card">
            {comic.thumbnail && (
              <img
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
                className="comicImg"
              />
            )}
            <div className="comicDetails">
              <h1 className="comic-details-title">{comic.title}</h1>
              <p className="comic-details-price">
                Price: {comic.prices[0].price}$
              </p>

              <div className="quantity-content">
                <Button
                  onClick={() =>
                    updateQuantity(comic.id, Math.max(0, quantity - 1))
                  }
                >
                  -
                </Button>
                <p>{quantity}</p>

                <Button onClick={() => updateQuantity(comic.id, quantity + 1)}>
                  +
                </Button>
              </div>
              <Button onClick={() => removeFromWishlist(comic)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="buy-button">
        {total !== 0 ? (
          <Link to="/purchase" className="buy-button">
            <Button>
              Buy <span>{total}</span>
            </Button>
          </Link>
        ) : (
          <p className="warning-message">Please select comics</p>
        )}
      </div>
    </div>
  );
};
