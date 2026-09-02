
import PropTypes from "prop-types";
import styles from "./Media.module.css";

const VideoPlayer = ({ videoUrl, title, description }) => {
  return (
    <div className={styles.videoContainer}>

      {title && (
        <h3 className={styles.videoTitle}>
          {title}
        </h3>
      )}

      {description && (
        <p className={styles.videoDescription}>
          {description}
        </p>
      )}

      <iframe
        className={styles.video}
        src={videoUrl}
        title={title || "Exercise demonstration"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
      </iframe>

    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default VideoPlayer;

