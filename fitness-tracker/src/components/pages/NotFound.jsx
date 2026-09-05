import { useNavigate } from 'react-router-dom';
import Button from "../UI/Button";
import commonStyles from "../common/common.module.css";

/**
 * 404 Not Found page — displayed for unmatched routes.
 * Uses programmatic navigation via useNavigate.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={commonStyles.pageContainer} style={{ textAlign: 'center', paddingTop: '80px' }}>
      <div style={{ fontSize: '3.5rem', marginBottom: '20px', opacity: 0.6 }}>🔍</div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1C1C1E', margin: '0 0 8px', letterSpacing: '-0.03em' }}>404</h1>
      <p style={{ fontSize: '0.95rem', color: '#8E8E93', marginBottom: '28px', fontWeight: 400 }}>

        The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate('/')}>Go Home</Button>
    </div>
  );
};

export default NotFound;
