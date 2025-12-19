import CategoryList from '../CategoryList/CategoryList';
import MainTitle from './../../common/MainTitle/MainTitle';
import SubTitle from './../../common/SubTitle/SubTitle';
const Categories = ({}) => {
  console.log('Categories');
  return (
    <div>
      <MainTitle text="Categories" />
      <SubTitle text="Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen." />
      <CategoryList />
    </div>
  );
};

export default Categories;
