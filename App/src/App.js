import React, {useState} from 'react';
import UserContext from './UserContext';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import SearchEngine from './pages/SearchEngine';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Routes>
          <Route path="*" element={<h1>Not Found</h1>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<SearchEngine/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
