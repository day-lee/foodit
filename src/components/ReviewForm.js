import { useState } from "react";
import FileInput from "./FileInput";

function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
    imgUrl: null,
  });

  const checkNumber = (type, value) => {
    switch (type) {
      case "Number":
        return Number(value) || 0;
      default:
        return value;
    }
  };

  // Utlising the 'name' and 'value' attributes of the input tag
  const changeInputHandle = (e) => {
    const { type, name, value } = e.target;
    handleChange(name, type, value);
  };

  const handleChange = (name, type, value) => {
    // functional update
    setValues((prev) => ({ ...prev, [name]: checkNumber(type, value) }));
  };

  const submitHandle = (e) => {
    // prevent default browser action
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={submitHandle}>
      <input
        type="text"
        name="title"
        value={values.title}
        onChange={changeInputHandle}
      />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={changeInputHandle}
      />
      <input
        type="text"
        name="content"
        value={values.content}
        onChange={changeInputHandle}
      />
      <FileInput name="imgUrl" value={values.imgUrl} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
