import React, { useEffect, useState } from "react";

import "./Comics.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useStore } from "../state/state";
import { Button } from "../components/button";
import { Loader } from "../components/loader";

export const Comics = () => {
  const { characterId } = useParams();
  const { fetchComicData, setSelectedComic, comicsData } = useStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;
    const characterIdNumber = parseInt(characterId);

    if (!isNaN(characterIdNumber)) {
      fetchComicData(characterIdNumber, publicKey, privateKey).finally(() =>
        setIsLoading(false)
      );
    }
  }, [characterId, fetchComicData]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="navigation">
            <Button onClick={() => handleGoBack()} className="back-link">
              &larr; Go Back
            </Button>
          </div>
          <div className="comics">
            {comicsData[characterId] &&
              comicsData[characterId].map((item) => (
                <Link
                  key={item.id}
                  to={`/comic-detail/${item.id}`}
                  className="comicCard"
                  style={{
                    background: `url(${item.thumbnail.path}.${item.thumbnail.extension}) no-repeat center`,
                    backgroundSize: "cover",
                  }}
                  onClick={() => setSelectedComic(item, characterId)}
                >
                  <div className="caption">{item.title}</div>
                  <div className="caption bottom">View Comic Details</div>
                </Link>
              ))}
          </div>
        </>
      )}
    </>
  );
};
