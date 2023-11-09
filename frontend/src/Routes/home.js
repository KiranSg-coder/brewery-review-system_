import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function BrewerySearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await axios.get(
          `https://api.openbrewerydb.org/breweries?by_${searchType}=${searchTerm}`
        );
        setBreweries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm) {
      fetchBreweries();
    }
  }, [searchTerm, searchType]);

  const handleSearch = () => {
    setBreweries([]);
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1 className="font-weight-bold">Brewery Review System</h1>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className="form-group">
        <select
          className="form-control"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="type">Type</option>
        </select>
      </div>

      <div className="brewery-list">
        <h2 className="text-light-brown mb-3">Brewery List</h2>
        {breweries.map((brewery) => (
          <div key={brewery.id} className="card mb-3">
            <Link to={`/home/breweries/${brewery.id}`}>
              <div className="card-header bg-primary text-white">
                <h2>{brewery.name}</h2>
              </div>
            </Link>
            <div className="card-body">
              <p className="card-text">
                <strong>Location:</strong> {brewery.city}, {brewery.state}
              </p>
              <p className="card-text">
                <strong>Phone:</strong> {brewery.phone}
              </p>
              <p className="card-text">
                <strong>Website:</strong>{' '}
                <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
                  {brewery.website_url}
                </a>
              </p>
              <p className="card-text">
                <strong>Rating:</strong> {brewery.rating ? brewery.rating : 'Not available'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrewerySearch;
