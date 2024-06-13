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

  const [selectedLocations, setSelectedLocations] = useState({});
  const [selectedTechnologies, setSelectedTechnologies] = useState({});
  const [selectedSeniorities, setSelectedSeniorities] = useState({});
  const [selectedYears, setSelectedYears] = useState({});
  const [selectedMonths, setSelectedMonths] = useState({});

  const getSelectedOptions = (options) => {
    return Object.keys(options).filter((option) => options[option]);
  };

  const clearFilters = () => {
    setSelectedLocations({});
    setSelectedTechnologies({});
    setSelectedSeniorities({});
    setSelectedYears({});
    setSelectedMonths({});
  };

  // const selectedLocationsArray = getSelectedOptions(selectedLocations);
  // const selectedTechnologiesArray = getSelectedOptions(selectedTechnologies);
  // const selectedSenioritiesArray = getSelectedOptions(selectedSeniorities);
  // const selectedYearsArray = getSelectedOptions(selectedYears);
  // const selectedMonthsArray = getSelectedOptions(selectedMonths);

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
          method: 'GET', headers: {
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

  return (<div className="body">
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
        <div className="search-buttons">
          <button className="search-button">Search</button>
          <button className="search-button" onClick={clearFilters}>Clear filters</button>
        </div>
        <div className="filter-options">
          <h3 className="no-select" onClick={() => setIsLocationsExpanded(!isLocationsExpanded)}>
            Filter by Location {isLocationsExpanded ? '▲' : '▼'}
          </h3>
          <ul className={`filter-list ${isLocationsExpanded ? 'expanded' : ''}`}>
            {locations.map((location, index) => (<li key={index}>
              <input
                type="checkbox"
                id={`location${index}`}
                name={`location${index}`}
                checked={selectedLocations[location] || false}
                onChange={(e) => {
                  setSelectedLocations(prevLocations => ({
                    ...prevLocations, [location]: e.target.checked,
                  }));
                }}
              />
              <label htmlFor={`location${index}`}>{location}</label>
            </li>))}
          </ul>

          <h3 className="no-select" onClick={() => setIsTechnologiesExpanded(!isTechnologiesExpanded)}>
            Filter by Technology {isTechnologiesExpanded ? '▲' : '▼'}
          </h3>
          <ul className={`filter-list ${isTechnologiesExpanded ? 'expanded' : ''}`}>
            {technologies.map((technology, index) => (<li key={index}>
              <input
                type="checkbox"
                id={`technology${index}`}
                name={`technology${index}`}
                checked={selectedTechnologies[technology] || false}
                onChange={(e) => {
                  setSelectedTechnologies(prevTechnologies => ({
                    ...prevTechnologies, [technology]: e.target.checked,
                  }));
                }}
              />
              <label htmlFor={`technology${index}`}>{technology}</label>
            </li>))}
          </ul>

          <h3 className="no-select" onClick={() => setIsSenioritiesExpanded(!isSenioritiesExpanded)}>
            Filter by Seniority {isSenioritiesExpanded ? '▲' : '▼'}
          </h3>
          <ul className={`filter-list ${isSenioritiesExpanded ? 'expanded' : ''}`}>
            {seniorities.map((seniority, index) => (<li key={index}>
              <input
                type="checkbox"
                id={`seniority${index}`}
                name={`seniority${index}`}
                checked={selectedSeniorities[seniority] || false}
                onChange={(e) => {
                  setSelectedSeniorities(prevSeniorities => ({
                    ...prevSeniorities, [seniority]: e.target.checked,
                  }));
                }}
              />
              <label htmlFor={`seniority${index}`}>{seniority}</label>
            </li>))}
          </ul>

          <h3 className="no-select" onClick={() => setIsYearsExpanded(!isYearsExpanded)}>
            Filter by Year {isYearsExpanded ? '▲' : '▼'}
          </h3>
          <ul className={`filter-list ${isYearsExpanded ? 'expanded' : ''}`}>
            {years.map((year, index) => (<li key={index}>
              <input
                type="checkbox"
                id={`year${index}`}
                name={`year${index}`}
                checked={selectedYears[year] || false}
                onChange={(e) => {
                  setSelectedYears(prevYears => ({
                    ...prevYears, [year]: e.target.checked,
                  }));
                }}
              />
              <label htmlFor={`year${index}`}>{year}</label>
            </li>))}
          </ul>

          <h3 className="no-select" onClick={() => setIsMonthsExpanded(!isMonthsExpanded)}>
            Filter by Month {isMonthsExpanded ? '▲' : '▼'}
          </h3>
          <ul className={`filter-list ${isMonthsExpanded ? 'expanded' : ''}`}>
            {months.map((month, index) => (<li key={index}>
              <input
                type="checkbox"
                id={`month${index}`}
                name={`month${index}`}
                checked={selectedMonths[month] || false}
                onChange={(e) => {
                  setSelectedMonths(prevMonths => ({
                    ...prevMonths, [month]: e.target.checked,
                  }));
                }}
              />
              <label htmlFor={`month${index}`}>{month}</label>
            </li>))}
          </ul>
        </div>

      </aside>
      <main className="main-content">

      </main>
    </div>
  </div>);
};

export default SearchEngine;