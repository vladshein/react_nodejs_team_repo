import { Navigate, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import "modern-normalize";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.hero}>
      <h1 className={styles.heroH1}>Campers of your dreams</h1>
      <p className={styles.heroText}>
        You can find everything you want in our catalog.
      </p>
      <button
        className={styles.heroButton}
        onClick={() => navigate("/catalog")}
      >
        View now
      </button>
    </div>
  );
};

export default HomePage;
