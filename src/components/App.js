import { useState, useEffect } from "react";
import getResponse from "../api";
import FoodList from "./FoodList.js";
import ReviewForm from "./ReviewForm.js";

function App() {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("");
  const [cursor, setCursor] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const loadHandle = async (options) => {
    let result;
    try {
      setLoading(true);
      // Destructuring for function properties
      // function 'getResponse's property 'options' is the object
      // Using destructuring with the same name for properties and values
      // allows us to avoid repetitive expressions,
      // e.g.,loadHandle({ order: order }); -> loadHandle({ order });
      result = await getResponse(options);
      setLoading(true);
      const { foods, paging } = result;
      if (!options.cursor) {
        setData(foods);
      } else {
        // Functional update
        // Asynchronous state update might use outdated value due to multiple updates.
        // Using a functional update can resolve this issue,
        // as it ensures the latest state value is referenced.
        setData((prevData) => [...prevData, ...foods]);
      }
      setCursor(paging.nextCursor);
    } catch (error) {
      setLoadingError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHandle({ order, search });
  }, [order, search]);
  // Search feature
  // adding the search state in the useEffect connects it with the order state.
  // it provides immediate feedback as users type in the search bar, with the results updating in real-time.

  const recentOrderHandle = () => {
    setOrder("createdAt");
    console.log("recent");
  };

  const calorieOrderHandle = () => {
    setOrder("calorie");
    console.log("calorie");
  };

  const loadMoreHandle = () => {
    console.log("loadmore " + cursor);
    loadHandle({ order, cursor, search });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  // const searchChangeHandle = (e) => {
  //   const search = e.target.value;
  //   setSearch(search);
  //   console.log(search);
  // };

  return (
    <>
      <button onClick={recentOrderHandle}> By Recently posted </button>
      <button onClick={calorieOrderHandle}> By Calorie </button>
      <form onSubmit={submitHandle}>
        <label htmlFor="search"></label>
        <input type="text" id="search" name="search" />
        <button type="submit">Search</button>
      </form>
      <ReviewForm />
      <FoodList data={data} />
      <button disabled={loading} onClick={loadMoreHandle}>
        Load More
      </button>
      {loadingError?.message && <p>{loadingError.message}</p>}
    </>
  );
}
export default App;
