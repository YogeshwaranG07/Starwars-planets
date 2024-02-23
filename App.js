// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [planets, setPlanets] = useState([]);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await axios.get(url);
      const data = response.data;
      setPlanets([...planets, ...data.results]);
      setNextPage(data.next);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handleLoadMore = () => {
    if (nextPage) {
      fetchPlanets(nextPage);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Star Wars Planets Directory</h1>
      </header>
      <div className="planets-container">
        {planets.map((planet, index) => (
          <div className="planet-card" key={index}>
            <h2>{planet.name}</h2>
            <p><strong>Climate:</strong> {planet.climate}</p>
            <p><strong>Population:</strong> {planet.population}</p>
            <p><strong>Terrain:</strong> {planet.terrain}</p>
            <h3>Residents:</h3>
            <ul className="residents-list">
              {planet.residents.map((resident, index) => (
                <li key={index}><a href={resident}>{resident}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {nextPage && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default App;
