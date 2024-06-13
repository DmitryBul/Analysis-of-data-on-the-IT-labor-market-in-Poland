import React, {useContext, useEffect} from 'react';
import UserContext from '../UserContext';
import {useNavigate} from "react-router-dom";
import '../styles.css';
import '../searchEngine.css';

const SearchEngine = ({children}) => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email || !user.username) {
      navigate('/login')
    }
  }, [user, navigate]);

  if (!user || !user.email || !user.username) {
    return null;
  }

  return (
    <div>
      <div className="navbar">
        <div className="logo">Search Engine</div>
        <div className="logout">
          <span className="username">{user.username}</span>
          <button className= "logout-button" onClick={() => {
            navigate('/login');
            user.username = '';
            user.email = '';
          }}>Logout
          </button>
        </div>
      </div>

      <div className="searchEngine">
        <aside className="sidebar">
        </aside>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SearchEngine;