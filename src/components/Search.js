import React, { useState } from 'react';

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [type, setType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `https://www.omdbapi.com/?apikey=a57d910e&s=${query}&type=${type}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.Search);
    } catch (err) {
      alert('Cannot find movie');
    }
  };

  return (
    <>
      <div className="container">
        <div className="row mt-3 ">
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control col-md-6"
              name="query"
              size="150"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              name="type"
              value={type}
              onChange={(evt) => {
                setType(evt.target.value);
              }}
              className="input-group-append sel"
            >
              <option value="">All</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
            <button
              type="submit"
              className="btn btn-info input-group-append"
              // onClick={handleSubmit}
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {movies ? (
            movies.map((movie) => (
              <div className="col-md-4" key={movie.imdbID}>
                <div
                  className="card mb-2 mt-2"
                  style={{ width: '20rem', height: '40rem' }}
                >
                  <img src={movie.Poster} className="card-img-top" alt="..." />

                  <div className="card-body">
                    <h5 className="card-title">{movie.Title}</h5>
                    <p className="card-text">Released On: {movie.Year}</p>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        alert('Added to favourites');
                        props.addFavourite(movie);
                      }}
                    >
                      Add to Favourites
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1>Invalid movie name</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
