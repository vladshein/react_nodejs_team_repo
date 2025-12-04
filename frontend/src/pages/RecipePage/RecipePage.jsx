import { Outlet } from "react-router-dom";
import styles from "./RecipePage.module.css";
import Location from "../../components/Location/Location";
import Filters from "../../components/Filters/Filters";
import TruckList from "../../components/TruckList/TruckList";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrucksOp } from "../../redux/trucksOps";
import { selectError, selectLoading } from "../../redux/trucksSlice";

const RecipePage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTrucksOp());
  }, [dispatch]);
  return (
    <div className={styles.catalogContainer}>
      <div>
        <Location />
        <Filters />
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <TruckList />
        )}
      </div>
    </div>
  );
};

export default RecipePage;
