import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Button } from "../../components/button";
import { UserForm } from "./UserForm";
import "./PurchaseForm.scss";
import { useNavigate } from "react-router-dom";

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long")
    .required("Required"),
  lastName: Yup.string()
    .min(1, "Too Short!")
    .max(50, "Too Long")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  number: Yup.number().required("Required"),
});

export const PurchaseForm = () => {
  const navigate = useNavigate();
  return (
    <div className="purchase-form-content">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          number: "",
          selectedGuide: "",
          selectedHotel: "",
          guideRecommendation: "",
          selectedLocation: "",
        }}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          resetForm();
          navigate("/success");
        }}
      >
        {({ values }) => (
          <Form className="purchase-form-inputs">
            <span className="purchase-form-title">Enter Contact Info</span>
            <UserForm />
            <div className="form-btn">
              <Button type="submit">Send</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
