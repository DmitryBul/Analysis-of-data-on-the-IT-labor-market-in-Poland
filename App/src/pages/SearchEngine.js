import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../UserContext';
import SalaryRangeSlider from '../InputRange';
import {useNavigate} from "react-router-dom";
import '../styles.css';
import '../searchEngine.css';

const SearchEngine = () => {
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

  const [salaryRange, setSalaryRange] = useState({min: 20000, max: 50000});

  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Change this to the number of items you want per page

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const encodeArray = (arr) => {
    return arr.map(item => encodeURIComponent(item.toString())).join(',');
  };

  const createFilterUrl = (selectedLocations, selectedTechnologies, selectedSeniorities, selectedYears, selectedMonths, minAvg_Salary, maxAvg_Salary) => {
    const locations = encodeArray(getSelectedOptions(selectedLocations));
    const technologies = encodeArray(getSelectedOptions(selectedTechnologies));
    const seniorities = encodeArray(getSelectedOptions(selectedSeniorities));
    const years = encodeArray(getSelectedOptions(selectedYears));
    const months = encodeArray(getSelectedOptions(selectedMonths));

    return `location=${locations}&technology=${technologies}&seniority=${seniorities}&year=${years}&month=${months}&minAvg_Salary=${minAvg_Salary}&maxAvg_Salary=${maxAvg_Salary}`;
  };

  const getSelectedOptions = (options) => {
    return Object.keys(options).filter((option) => options[option]);
  };

  const resetSalaryRange = () => {
    setSalaryRange({min: 20000, max: 50000});
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    browse()
  };


  const clearFilters = () => {
    setSelectedLocations({});
    setSelectedTechnologies({});
    setSelectedSeniorities({});
    setSelectedYears({});
    setSelectedMonths({});
    resetSalaryRange();
  };

  const browse = () => {
    setIsLoading(true);
    const minAvg_Salary = salaryRange.min;
    const maxAvg_Salary = salaryRange.max;
    const url = createFilterUrl(selectedLocations, selectedTechnologies, selectedSeniorities, selectedYears, selectedMonths, minAvg_Salary, maxAvg_Salary) + `&page=${currentPage}&limit=${itemsPerPage}`;

    fetch(`/api/items?${url}`)
      .then(response => response.json())
      .then(data => {
        setData(data.items);
        setTotalRecords(data.totalItems);
        setTotalPages(data.totalPages);
        if (currentPage > data.totalPages && data.totalPages > 0) {
          setCurrentPage(1);
          return browse()
          //todo
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }

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

    browse();

    fetchFilters().then(r => r);
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
          <button className="search-button" onClick={browse}>Search</button>
          <button className="search-button" onClick={clearFilters}>Clear filters</button>
        </div>

        <div className="filter-options">
          <h3>Filter by Salary Range</h3>
          <div className="slider-container">
            <SalaryRangeSlider value={salaryRange} setValue={setSalaryRange}/>
          </div>
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
        <div className="page-navigation">
          <button className="page-button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading}>Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="page-button" onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}>Next
          </button>
        </div>
        Total records: {totalRecords}
        <div className="results">
          <table>
            <thead>
            <tr>
              <th>Company</th>
              <th>Location</th>
              <th>Technology</th>
              <th>Seniority</th>
              <th>Year</th>
              <th>Month</th>
              <th>Salary</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (<tr key={index}>
                <td>{item.companyName}</td>
                <td>{item.location}</td>
                <td>{item.technology}</td>
                <td>{item.seniority}</td>
                <td>{item.year}</td>
                <td>{item.month}</td>
                <td>{item.avg_Salary}</td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>);
};

export default SearchEngine;