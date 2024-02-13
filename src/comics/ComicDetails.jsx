import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStore } from "../state/state";
import "./ComicDetails.scss";
import { Button } from "../components/button/index";

export const ComicDetails = () => {
  // const { comicsId } = useParams();
  const navigate = useNavigate();

  const { selectedComic, addToWishlist } = useStore();

  const handleBuy = () => {
    if (selectedComic) addToWishlist(selectedComic);
  };

  const handleWishlist = () => {
    if (selectedComic) addToWishlist(selectedComic);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="navigation">
        <Button onClick={() => handleGoBack()} className="back-link">
          &larr; Go Back
        </Button>
      </div>
      {selectedComic && (
        <div className="comic">
          <img
            src={`${selectedComic.thumbnail?.path}.${selectedComic.thumbnail?.extension}`}
            alt={selectedComic.title}
            className="comicImg"
          />
          <div className="comicContent">
            <div className="content">
              <h3 className="comicName">{selectedComic.title}</h3>
              <p className="comicDescription">{selectedComic.description}</p>
              {selectedComic.prices && selectedComic.prices.length > 0 && (
                <>
                  <p className="comicPrice">
                    Price:{" "}
                    <span className="comicPrice number">
                      {selectedComic.prices[0].price}$
                    </span>
                  </p>
                  {selectedComic.prices[0].price > 0 && (
                    <div className="wish-list-content">
                      <Button onClick={handleWishlist} className="wishlist-btn">
                        Wishlist
                      </Button>
                      <Link to="/order">
                        <Button onClick={handleBuy}>Buy</Button>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
