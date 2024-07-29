import { useState } from "react";

function ReviewForm() {
  const [values, setValues] = useState({ title: "", calorie: 0, content: "" });

  const checkNumber = (type, value) => {
    switch (type) {
      case "Number":
        return Number(value) || 0;
      default:
        return value;
    }
  };

  // Utlising the 'name' and 'value' attributes of the input tag
  const changeHandle = (e) => {
    const { type, name, value } = e.target;
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
        onChange={changeHandle}
      />
      <input
        type="number"
        name="calorie"
        value={values.calorie}
        onChange={changeHandle}
      />
      <input
        type="text"
        name="content"
        value={values.content}
        onChange={changeHandle}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
