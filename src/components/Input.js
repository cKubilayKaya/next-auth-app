import React from "react";

export default function Input({ touched, errors, ...props }) {
  return (
    <label className="label">
      <span>{props.placeholder}</span>
      <input {...props} className={errors && "error-input"} />
      {touched && errors && <span className="error">{errors}</span>}
    </label>
  );
}
