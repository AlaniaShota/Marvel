import React from "react";
import { useStore } from "../state/state";
import "./Purchase.scss";
import { Link } from "react-router-dom";
import { Button } from "../components/button/index";
import { PurchaseForm } from "./components";

export const Purchase = () => {
  return <PurchaseForm />;
};
