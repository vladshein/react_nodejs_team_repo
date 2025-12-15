import { useEffect } from 'react';
import { useParams, Outlet, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserInfo from '../../components/SharedLayoutComponents/UserInfo/UserInfo';
import styles from './UserPage.module.css';
import { fetchUser } from '../../redux/users/actions';

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id)); 
    }
  }, [dispatch, id]);

  return (
    <div className={styles.pageContainer}>

      <aside className={styles.sidebar}>
        <UserInfo />

        <nav className={styles.navMenu}>
          <NavLink to="recipes" className={({isActive}) => isActive ? styles.active : ''}>My Recipes</NavLink>
          <NavLink to="favorites" className={({isActive}) => isActive ? styles.active : ''}>Favorites</NavLink>
          <NavLink to="followers" className={({isActive}) => isActive ? styles.active : ''}>Followers</NavLink>
          <NavLink to="following" className={({isActive}) => isActive ? styles.active : ''}>Following</NavLink>
        </nav>
      </aside>

      <main className={styles.content}>
        <Outlet />
      </main>

    </div>
  );
};

export default UserPage;





// import { Outlet } from "react-router-dom";
// import styles from "./UserPage.module.css";
// import Location from "../../components/Location/Location";
// import Filters from "../../components/Filters/Filters";
// import TruckList from "../../components/TruckList/TruckList";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTrucksOp } from "../../redux/trucksOps";
// import { selectError, selectLoading } from "../../redux/trucksSlice";

// const UserPage = () => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(selectLoading);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     dispatch(fetchTrucksOp());
//   }, [dispatch]);
//   return (
//     <div className={styles.catalogContainer}>
//       <div>
//         <Location />
//         <Filters />
//       </div>
//       <div>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <TruckList />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserPage;
