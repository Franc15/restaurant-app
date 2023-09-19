import { useState, useEffect } from "react";
import yelp from "../api/yelp";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "../store/restaurantSlice";

export default () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const searchApi = async (searchTerm) => {
    setLoading(true);
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorMessage("Something went wrong");
      dispatch(setRestaurants([]));
    }
  };

  //   searchApi("pasta");
  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, loading, results, errorMessage];
};
