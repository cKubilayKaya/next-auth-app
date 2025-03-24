import React from "react";

export default function Input({ touched, errors, ...props }) {
  return (
    <label className="label">
      <input {...props} className={errors && "error-input"} />
      {touched && errors && <span className="error">{errors}</span>}
    </label>
  );
}
