import { NavLink, Outlet, useParams } from "react-router-dom";
import { selectOne } from "../../redux/trucksSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddRecipePage.module.css";
import { fetchOneOp } from "../../redux/trucksOps";
import { useEffect } from "react";
import BookForm from "../../components/BookForm/BookForm";

const AddRecipePage = () => {
  const { catalogId } = useParams();
  console.log("TruckId", catalogId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOneOp(catalogId));
  }, [dispatch, catalogId]);

  const truck = useSelector(selectOne);
  const navClasses = ({ isActive }) => (isActive ? style.activeText : "");

  return (
    <div className={style.detailsContainer}>
      <div className={style.descriptionAndGallery}>
        <div className={style.truckDescription}>
          <h2>{truck.name}</h2>
          <div className={style.secondLine}>
            <div className={style.ratingReview}>
              <svg width="16" height="16">
                <use href={"/icons.svg#yellow-star"}></use>
              </svg>

              {console.log("truck reviews:", truck.gallery)}
              <p className={style.reviewText}>
                {truck.rating}({truck.reviews.length} reviews)
              </p>
            </div>

            <div className={style.location}>
              <svg width="16" height="16">
                <use href={"/icons.svg#map"}></use>
              </svg>
              <p>{truck.location}</p>
            </div>
          </div>
          <div>
            <h2 className={style.firstLineText}>€{truck.price}.00</h2>
          </div>
        </div>
        {console.log("truck gallery:", truck.gallery)}

        <ul className={style.imageList}>
          {truck.gallery.map((image, index) => (
            <li className={style.item} key={`image${index}`}>
              <img
                className={style.truckImage}
                src={image.original}
                alt={`Image ${index}`}
              />
            </li>
          ))}
        </ul>
        <p className={style.truckDescriptionText}>{truck.description}</p>
      </div>

      <div>
        <ul className={style.featuresAndReviews}>
          <li>
            <NavLink to="features" className={navClasses}>
              Features
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={navClasses}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1312"
          height="2"
          viewBox="0 0 1312 2"
          fill="none"
        >
          <path d="M0 1H1312" stroke="#DADDE1" />
        </svg>
      </div>
      <div className={style.reviewBook}>
        <Outlet />
        <BookForm />
      </div>
    </div>
  );
};

export default AddRecipePage;
