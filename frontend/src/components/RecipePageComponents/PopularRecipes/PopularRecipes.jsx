import styles from './PopularRecipes.module.css';

const PopularRecipes = ({ popular }) => {
  return (
    <section className={styles.popular}>
      <h2 className={styles.title}>Popular recipes</h2>

      <div className={styles.cards}>
        {popular
          ? popular.map((recipe) => {
              return (
                <article key={recipe.id} className={styles.card}>
                  <img src={recipe.thumb} alt={recipe.title} className={styles.cardImage} />

                  <div className={styles.cardContent}>
                    <div className={styles.cardText}>
                      <h3 className={styles.cardTitle}>{recipe.title}</h3>
                      <p className={styles.cardDescription}>{recipe.description}</p>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.user}>
                        <img
                          src={recipe.owner.avatar}
                          alt={recipe.owner.name}
                          className={styles.userAvatar}
                        />
                        <span className={styles.userName}>{recipe.owner.name}</span>
                      </div>

                      <div className={styles.icons}>
                        <button className={styles.iconButton}>♥</button>
                        <button className={styles.iconButton}>↗</button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          : null}
      </div>
    </section>
  );
};

export default PopularRecipes;
