import { ErrorMessage, Field } from "formik";
import React from "react";
import "./UserForm.scss";

export const UserForm = () => {
  const formInput = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 4,
      name: "number",
      type: "number",
      placeholder: "Number",
    },
  ];

  return (
    <>
     
      {formInput.map((item) => (
        <div key={item.id} className="form-content">
          <Field
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            className="form-input"
          />
          <ErrorMessage name={item.name}>
            {(msg) => <div className="error-msg">{msg}</div>}
          </ErrorMessage>
        </div>
      ))}
    </>
  );
};
