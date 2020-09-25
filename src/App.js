import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Favourites from './components/Favourites';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (favourite) => {
    setFavourites([...favourites, favourite]);
    localStorage.setItem(
      'favourites',
      JSON.stringify([...favourites, favourite])
    );
  };
  return (
    <Router>
      <nav className="navbar navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Home
        </Link>

        <form className="form-inline">
          <Link to="/Favourites">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Favourites
            </button>
          </Link>
        </form>
      </nav>
      <Switch>
        <Route
          path="/"
          component={() => <Search addFavourite={addFavourite} />}
        />
        <Route
          path="/favourites"
          exact
          component={() => (
            <Favourites
              favourites={JSON.parse(localStorage.getItem('favourites'))}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
