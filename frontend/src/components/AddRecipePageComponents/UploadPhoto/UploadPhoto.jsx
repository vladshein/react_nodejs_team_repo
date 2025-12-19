import IconCamera from '../../common/icons/IconCamera';
import styles from './UploadPhoto.module.css';

const UploadPhoto = ({ name, onChange, onBlur, thumbPreview, isError }) => {
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
      <label
        htmlFor="photo-upload"
        className={`${styles.photoUploadLabel} ${isError ? styles.errorBorder : ''}`}>
        {thumbPreview ? (
          <div className={styles.previewWrapper}>
            <div className={styles.previewImageContainer}>
              <img src={thumbPreview} alt="Recipe thumbnail" className={styles.previewImage} />
            </div>
            <span className={styles.uploadAnotherText}>Upload another photo</span>
          </div>
        ) : (
          <div className={styles.cameraWrapper}>
            <IconCamera className={`${styles.cameraIcon} ${isError ? styles.IconError : ''}`} />
            <span className={`${styles.uploadText} ${isError ? styles.textError : ''}`}>
              Upload a photo
            </span>
          </div>
        )}
      </label>
    </>
  );
};

export default UploadPhoto;
