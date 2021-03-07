import React, { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import Favourites from './components/Favourites';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
	const [favourites, setFavourites] = useState([]);
	const [allMovies, setAllMovies] = useState([]);

	const addFavourite = (favourite) => {
		setFavourites([...favourites, favourite]);
		localStorage.setItem(
			'favourites',
			JSON.stringify([...favourites, favourite])
		);
	};

	useEffect(() => {
		async function showMovies() {
			const url = `https://www.omdbapi.com/?apikey=a57d910e&s=mission`;
			try {
				const res = await fetch(url);
				const data = await res.json();
				setAllMovies(data.Search);
			} catch {
				alert("Movies Couldn't be Loaded");
			}
		}
		showMovies();
	}, []);

	return (
		<>
			<Router>
				<nav className='navbar navbar-light bg-light'>
					<Link to='/movieSearch' className='navbar-brand'>
						Home
					</Link>

					<form className='form-inline'>
						<Link to='/Favourites'>
							<button
								className='btn btn-outline-success my-2 my-sm-0'
								type='submit'>
								Favourites
							</button>
						</Link>
					</form>
				</nav>
				<Switch>
					<Route
						path='/movieSearch'
						exact
						component={() => <Search addFavourite={addFavourite} />}
					/>
					<Route
						path='/favourites'
						exact
						component={() => (
							<Favourites
								favourites={JSON.parse(localStorage.getItem('favourites'))}
							/>
						)}
					/>
				</Switch>
			</Router>
			<div className='container'>
				<div className='row'>
					{allMovies ? (
						allMovies.map((allMovie) => (
							<div className='col-md-4' key={allMovie.imdbID}>
								<div
									className='card mb-2 mt-2'
									style={{ width: '20rem', height: '40rem' }}>
									<img
										src={allMovie.Poster}
										className='card-img-top'
										alt='...'
									/>

									<div className='card-body'>
										<h5 className='card-title'>{allMovie.Title}</h5>
										<p className='card-text'>Released On: {allMovie.Year}</p>
									</div>
								</div>
							</div>
						))
					) : (
						<h1>Sorry</h1>
					)}
				</div>
			</div>
		</>
	);
}

export default App;
