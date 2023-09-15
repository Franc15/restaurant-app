import { useState, useEffect } from "react";
import yelp from "../api/yelp";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "../store/restaurantSlice";

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "new york",
        },
      });
      setResults(response.data.businesses);
      dispatch(setRestaurants(response.data.businesses));
    } catch (err) {
      setErrorMessage("Something went wrong");
      dispatch(setRestaurants([]));
    }
  };

  //   searchApi("pasta");
  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results, errorMessage];
};
