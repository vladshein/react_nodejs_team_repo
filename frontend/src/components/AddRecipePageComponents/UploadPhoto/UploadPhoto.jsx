import IconCamera from '../../common/icons/IconCamera';
import styles from './UploadPhoto.module.css';

const UploadPhoto = ({ name, onChange, onBlur, thumbPreview }) => {
  return (
    <>
      <input
        type="file"
        id="photo-upload"
        name={name}
        accept="image/*"
        onChange={onChange}
        onBlur={onBlur}
        hidden
      />
      <label htmlFor="photo-upload" className={styles.photoUploadLabel}>
        {thumbPreview ? (
          <div className={styles.previewWrapper}>
            <div className={styles.previewImageContainer}>
              <img src={thumbPreview} alt="Recipe thumbnail" className={styles.previewImage} />
            </div>
            <span className={styles.uploadAnotherText}>Upload another photo</span>
          </div>
        ) : (
          <div className={styles.cameraWrapper}>
            <IconCamera className={styles.cameraIcon} />
            <span className={styles.uploadText}>Upload a photo</span>
          </div>
        )}
      </label>
    </>
  );
};

export default UploadPhoto;
