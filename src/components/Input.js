import React from "react";

export default function Input({ touched, errors, ...props }) {
  return (
    <label className="block w-full mb-2">
      <input {...props} />
      {touched && errors && <span className="text-red-500 text-sm mt-1">{errors}</span>}
    </label>
  );
}
