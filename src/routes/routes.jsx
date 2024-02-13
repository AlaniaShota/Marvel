import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components";
import { Comics, ComicDetails } from "../comics/index.js";
import { Purchase } from "../purchase/index.js";
import { CharactersList } from "../characher/CharactersList.jsx";
// import { ComicProvider } from "../context/Context.jsx";
import { Order } from "../order/Order.jsx";
import { Success } from "../success/Success.jsx";
import { Error } from "../404/Error.jsx";

export const router = createBrowserRouter([
  {
    element: (
      <>
        <Layout />
      </>
    ),
    children: [
      { path: "/", element: <CharactersList /> },

      { path: "/comics/:characterId", element: <Comics /> },
      {
        path: "/comic-detail/:comicsId",
        element: <ComicDetails />,
      },
      { path: "/order", element: <Order /> },
      { path: "/purchase", element: <Purchase /> },
      { path: "/success", element: <Success /> },
      { path: "*", element: <Error /> },
    ],
  },
]);
