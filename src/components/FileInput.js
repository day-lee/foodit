import { useState } from "react";

function FileInput({ name, value, onChange }) {
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    const type = e.target.type;
    onChange(name, type, nextValue);
  };
  return <input type="file" onChange={handleChange} />;
}

export default FileInput;
