import CategoryList from '../CategoryList/CategoryList';
import MainTitle from './../../common/MainTitle/MainTitle';
import SubTitle from './../../common/SubTitle/SubTitle';
import styles from './Categories.module.css';

const Categories = ({ limit = 11, showAllCard = true }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <MainTitle text="Categories" align="left" />
        <SubTitle
          text="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen."
          align="left"
        />
        <CategoryList limit={limit} showAllCard={showAllCard} />
      </div>
    </section>
  );
};

export default Categories;
