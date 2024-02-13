import "./Search.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../state/state";
import { Button } from "../button/index";

export const Search = () => {
  const { fetchSearchCharacterData } = useStore();

  const [character, setCharacter] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setCharacter(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;

    try {
      await fetchSearchCharacterData(publicKey, privateKey, character);
      navigate(`/?name=${character}`);
    } catch (error) {
      console.error("Error while getting character data:", error);
    }
  };

  return (
    <>
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ENTER CHARACTER NAME"
          onChange={handleInputChange}
          value={character}
        />
        <div className="buttons">
          <Button type="submit">Search</Button>
        </div>
      </form>
    </>
  );
};
