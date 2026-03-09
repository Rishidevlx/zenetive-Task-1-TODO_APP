import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid var(--border)', marginBottom: '30px' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Task Manager
      </Link>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '15px' }}>Hello, {user.name}</span>
            <button className="btn btn-danger" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '15px' }}>Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
