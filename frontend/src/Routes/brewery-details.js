import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

function BreweryDetails() {
  const [brewery, setBrewery] = useState({});
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then((response) => {
        setBrewery(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brewery details:', error);
      });

    axios.get(`http://localhost:8080/home/breweries/${id}/review`)
      .then(response => {
        setReviews(response.data);
      }).catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-body">
          <h2 className="card-title text-success">{brewery.name}</h2>
          <p className="card-text text-secondary">
            <strong>Address:</strong> {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}
          </p>
          <p className="card-text text-info">
            <strong>Website:</strong> <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a>
          </p>
          <p className="card-text text-dark">
            <strong>Phone:</strong> {brewery.phone}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-danger">Reviews and Ratings:</h3>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title text-danger">Rating: {review.rating}</h5>
                <p className="card-text text-dark">Review: {review.review}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No reviews for this brewery</p>
        )}
      </div>

      <NavLink to={`/home/breweries/${id}/review`} className="btn btn-info mt-3">
        Add Review
      </NavLink>
    </div>
  );
}

export default BreweryDetails;
