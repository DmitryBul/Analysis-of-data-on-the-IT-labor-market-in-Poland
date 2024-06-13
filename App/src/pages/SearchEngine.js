import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../UserContext';
import {useNavigate} from "react-router-dom";
import '../styles.css';
import '../searchEngine.css';

const SearchEngine = ({children}) => {
  const [locations, setLocations] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [seniorities, setSeniorities] = useState([]);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [isLocationsExpanded, setIsLocationsExpanded] = useState(false);
  const [isTechnologiesExpanded, setIsTechnologiesExpanded] = useState(false);
  const [isSenioritiesExpanded, setIsSenioritiesExpanded] = useState(false);
  const [isYearsExpanded, setIsYearsExpanded] = useState(false);
  const [isMonthsExpanded, setIsMonthsExpanded] = useState(false);


  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.email || !user.username) {
      navigate('/login')
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('/api/items/filters', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setLocations(data.location);
          setTechnologies(data.technology);
          setSeniorities(data.seniority);
          setYears(data.year);
          setMonths(data.month);
        } else {
          console.error('Error fetching filters');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    fetchFilters();
  }, []);

  if (!user || !user.email || !user.username) {
    return null;
  }

  return (
    <div className="body">
      <div className="navbar">
        <div className="logo">Search Engine</div>
        <div className="logout">
          <span className="username">{user.username}</span>
          <button className="logout-button" onClick={() => {
            navigate('/login');
            user.username = '';
            user.email = '';
          }}>Logout
          </button>
        </div>
      </div>

      <div className="searchEngine">
        <aside className="sidebar">
          <div className="filter-options">
            <div className="filter-options">
              <h3 onClick={() => setIsLocationsExpanded(!isLocationsExpanded)}>Filter by Location</h3>
              {isLocationsExpanded && (
                <ul>
                  {locations.map((location, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`location${index}`} name={`location${index}`}/>
                      <label htmlFor={`location${index}`}>{location}</label>
                    </li>
                  ))}
                </ul>
              )}

              <h3 onClick={() => setIsTechnologiesExpanded(!isTechnologiesExpanded)}>Filter by Technology</h3>
              {isTechnologiesExpanded && (
                <ul>
                  {technologies.map((technology, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`technology${index}`} name={`technology${index}`}/>
                      <label htmlFor={`technology${index}`}>{technology}</label>
                    </li>
                  ))}
                </ul>
              )}

              <h3 onClick={() => setIsSenioritiesExpanded(!isSenioritiesExpanded)}>Filter by Seniority</h3>
              {isSenioritiesExpanded && (
                <ul>
                  {seniorities.map((seniority, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`seniority${index}`} name={`seniority${index}`}/>
                      <label htmlFor={`seniority${index}`}>{seniority}</label>
                    </li>
                  ))}
                </ul>
              )}

              <h3 onClick={() => setIsYearsExpanded(!isYearsExpanded)}>Filter by Year</h3>
              {isYearsExpanded && (
                <ul>
                  {years.map((year, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`year${index}`} name={`year${index}`}/>
                      <label htmlFor={`year${index}`}>{year}</label>
                    </li>
                  ))}
                </ul>
              )}

              <h3 onClick={() => setIsMonthsExpanded(!isMonthsExpanded)}>Filter by Month</h3>
              {isMonthsExpanded && (
                <ul>
                  {months.map((month, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`month${index}`} name={`month${index}`}/>
                      <label htmlFor={`month${index}`}>{month}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
    ;
};

export default SearchEngine;