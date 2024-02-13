import md5 from "md5";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Characters.scss";
import { useStore } from "../state/state";
import { Loader } from "../components/loader";

export const CharactersList = () => {
  const { characterData, searchResults, fetchCharacterData } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;

    fetchCharacterData(publicKey, privateKey, "").finally(() =>
      setIsLoading(false)
    );
  }, [fetchCharacterData]);

  return (
    <div className="characters">
      {isLoading ? (
        <Loader />
      ) : (
        (searchResults.length > 0 ? searchResults : characterData).map(
          (item) => (
            <Link
              key={item.id}
              className="characterCard"
              to={`/comics/${item.id}`}
              style={{
                background: `url(${item.thumbnail.path}.${item.thumbnail.extension}) no-repeat center`,
                backgroundSize: "cover",
              }}
            >
              <h1 className="caption">{item.name}</h1>
              <p className="caption bottom">View Comics</p>
            </Link>
          )
        )
      )}
    </div>
  );
};
