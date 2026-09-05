import PropTypes from 'prop-types';
import styles from './Media.module.css';

/**
 * AudioPlayer wraps an HTML5 <audio> element with title, duration, and description.
 * Includes fallback content for unsupported browsers.
 */
const AudioPlayer = ({ audioUrl, title, duration, description }) => {
  return (
    <div className={styles.audioContainer}>
      <div className={styles.audioHeader}>
        <h4 className={styles.audioTitle}>{title}</h4>
        {duration && <span className={styles.audioDuration}>{duration}</span>}
      </div>
      {description && <p className={styles.audioDescription}>{description}</p>}
      <audio className={styles.audio} controls preload="metadata">
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
};

export default AudioPlayer;
