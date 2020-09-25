import React from 'react';

const Favourites = (props) => {
  const { favourites } = props;
  return favourites ? (
    <div>
      {favourites.map((movie) => (
        <div className="col-md-4" key={movie.imdbID}>
          <div
            className="card mb-2 mt-2"
            style={{ width: '20rem', height: '40rem' }}
          >
            <img src={movie.Poster} className="card-img-top" alt="..." />
            <form>
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">Released On: {movie.Year}</p>
              </div>
            </form>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className=" container mx-5 my-5">
      <h1>No favourite Movie selected</h1>
    </div>
  );
};

export default Favourites;
