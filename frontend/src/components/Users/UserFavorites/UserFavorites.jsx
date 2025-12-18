import styles from './UserFavorites.module.css';

const UserFavorites = () => {
  // ТИМЧАСОВІ ДАНІ (MOCK DATA)
  const favorites = [
    { 
      id: 1, 
      title: "Spaghetti Carbonara", 
      time: "40 min", 
      image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      id: 2, 
      title: "Avocado Toast", 
      time: "15 min", 
      image: "https://images.unsplash.com/photo-1588137372308-15f75323ca8d?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      id: 3, 
      title: "Berry Smoothie", 
      time: "10 min", 
      image: "https://images.unsplash.com/photo-1553530666-ba11a90696f9?auto=format&fit=crop&w=300&q=80" 
    },
    { 
      id: 4, 
      title: "Chicken Curry", 
      time: "60 min", 
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80" 
    },
  ];

  return (
    <div className={styles.container}>
      {favorites.length > 0 ? (
        <ul className={styles.list}>
          {favorites.map((recipe) => (
            <li key={recipe.id} className={styles.cardItem}>
              {/* Тут пізніше буде <RecipeCard recipe={recipe} /> */}
              <div className={styles.cardStub}>
                <img src={recipe.image} alt={recipe.title} className={styles.image} />
                <div className={styles.info}>
                  <h4 className={styles.title}>{recipe.title}</h4>
                  <span className={styles.time}>⏱ {recipe.time}</span>
                  <button className={styles.deleteBtn}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyText}>You haven't added any favorite recipes yet.</p>
      )}
    </div>
  );
};

export default UserFavorites;