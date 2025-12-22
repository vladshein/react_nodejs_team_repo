import { useNavigate } from 'react-router-dom';
import IconArrowUpRight from '../../common/icons/IconArrowUpRight';
import Button from '../../common/button/Button';
import styles from './UserList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserId, selectIsFollowing } from '../../../redux/users/selectors';
import { followUser, unfollowUser } from '../../../redux/users/actions';

const UserList = ({ user }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(selectCurrentUserId);
  const navigate = useNavigate();
  const { avatar, name, recipesCount, id } = user;
  const isFollowing = useSelector(selectIsFollowing(id));

  const recipes = user.recipesHas || [];
  const defaultAvatar = '/cat_avatar.png';
  const handleGoToProfile = () => {
    navigate(`/user/${id}`);
  };

  const handleFollow = (userId) => {
    dispatch(followUser(userId)).unwrap();
  };

  const handleUnfollow = (userId) => {
    dispatch(unfollowUser(userId)).unwrap();
  };

  return (
    <li className={styles.card}>
      <div
        className={styles.avatarWrapper}
        onClick={handleGoToProfile}
        style={{ cursor: 'pointer' }}>
        <img
          src={avatar || defaultAvatar}
          alt={name}
          className={styles.avatar}
          width="60"
          height="60"
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name} onClick={handleGoToProfile} style={{ cursor: 'pointer' }}>
            {name}
          </h3>
          <p className={styles.recipesInfo}>Own recipes: {recipesCount}</p>

          {currentUserId !== id && (
            <Button
              type="button"
              variant={isFollowing ? 'outlined' : 'filled'}
              className={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                if (isFollowing) {
                  handleUnfollow(id);
                } else {
                  handleFollow(id);
                }
              }}>
              {isFollowing ? 'UNFOLLOW' : 'FOLLOW'}
            </Button>
          )}
        </div>

        {recipes.length > 0 && (
          <ul className={styles.recipePreviews}>
            {recipes.slice(0, 4).map((recipe) => (
              <li key={recipe.id || recipe._id} className={styles.recipeItem}>
                <img
                  src={recipe.image || recipe.thumb || recipe.preview}
                  alt={recipe.title}
                  className={styles.recipeImage}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        )}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={handleGoToProfile}
            aria-label="Go to profile">
            <IconArrowUpRight className={styles.iconArrow} width={18} height={18} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default UserList;
