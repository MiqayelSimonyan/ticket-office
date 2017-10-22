import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMovie, createCashier, getMovies, getMovieDays, editMovieMW, deleteMovieMW,
		 getHalls, getCashiers, createHall } from '../middlewars/admin.middleware';
import {DeleteErrors, sortMovies, filterMovies} from '../AC';
import AdminComponent from '../components/admin/admin.component';
import AlertContainer from './alert/alert.container';
import Auth from '../auth';

class AdminContainer extends Component {
	constructor(props) {
		super(props);
		this.admin = '';
	}

	componentWillMount() {
		if (Auth.isAuthenticated('username')) this.admin = Auth.getToken('username');		
		this.props.DeleteErrors();
	}

	componentDidMount() {
		this.props.getMoviesData('/api/movies');
		this.props.getHallsData('/api/halls');
		this.props.getCashiersData('/api/cashiers');
		this.props.getMovieDaysData('/api/movie/days');
	}

	createHall(event) {
		event.preventDefault();
		var hall = {name: this.hallName ? this.hallName.value : ''}
		this.props.AddHall('/admin/hall', hall);
	}

	createMovie(event) {
		event.preventDefault();
		if (this.hall) var hall = this.props.halls.filter(hall => hall.name == this.hall.value);
		var movie = {
			hall: this.hall && hall ? hall[0]._id : '',
			name: this.movie ? this.movie.value : '',
			startTime: this.startTime ? this.startTime.value : '',
			day: this.day ? this.day.value : '',
			durationHour: this.durationHour ? this.durationHour.value : '',
			durationSecond: this.durationSecond ? this.durationSecond.value : '',
			price: this.price ? this.price.value : ''
		}

		this.props.AddMovie('/admin/movie', movie);
	}

	createCashier(event) {
		event.preventDefault();
		var cashier = {
			name: this._name ? this._name.value : '',
			username: this.username ? this.username.value : '',
			password: this.password ? this.password.value : ''
		}

		this.props.AddCashier('/admin/cashier', cashier);
	}

	sortData(sortType, event) {
    	if (event.target.tagName.toLowerCase() !== 'select')
		this.props.SortMovies(sortType, this.props.movies[sortType].sortOrder, this.props.movies.data);
	}

	filterHalls(event) {
		this.props.FilterMovies('Hall', event.target.value, this.props.movies.copyData);
	}

	filterDays(event) {
		this.props.FilterMovies('Day', event.target.value, this.props.movies.copyData);
	}

	editMovie(movie, event) {		
		this.setState({
			edit: {
				id: movie._id,
				isEdit: true
			}
		});
	}

	updateMovie(movie, event) {
		var editedMovie = {
			id: movie._id,
			hall: movie.hall._id,
			name: movie.name,
			startTime: movie.startTime,
			day: movie.day,
			duration: movie.duration,
			price: movie.price
		}

		this.props.editMovieData('/api/movie/edit', {...editedMovie});

		if (this.state.edit.id === movie._id) this.setState({
			edit: {id: '', isEdit: false}
		});
	}

	deleteMovie(id, event) {
		let deleteConfirm = window.confirm('Are you sure to delete?');
		if (deleteConfirm) this.props.deleteMovieData('/api/movie/delete', id);
	}

	render() {
		return (
			<div>
				{
					this.props.errors.length ?
						<AlertContainer errors={this.props.errors} duration="8000" /> :
					this.props.success.length ?
						<AlertContainer errors={this.props.success} duration="8000" /> :
					''
				}
				<AdminComponent onClick={this.aaa} {...this.props}
					admin={this.admin}
					logOut={this.logOut}			
					createHall={this.createHall}
					createMovie={this.createMovie}
					createCashier={this.createCashier}
					sortData={this.sortData}
					filterHalls={this.filterHalls}
					filterDays={this.filterDays}
					editMovie={this.editMovie}
					updateMovie={this.updateMovie}
					deleteMovie={this.deleteMovie} />
			</div>
		)
	}
}

export default connect(
	state => ({
		admin: state.Admins,
		movies: state.Movies,
		halls: state.Halls,
		cashier: state.Cashiers,
		errors: state.Errors,
		success: state.Success
	}),
	dispatch => ({
		getMoviesData: (url => {
			dispatch(getMovies(url))
		}),
		getMovieDaysData: (url => {
			dispatch(getMovieDays(url))
		}),
		AddMovie: (url, movie) => {
			dispatch(createMovie(url, movie))
		},
		SortMovies: (sortType, sortOrder, movies) => {
			dispatch(sortMovies(sortType, sortOrder, movies))
		},
		FilterMovies: (filterType, param, movies) => {
			dispatch(filterMovies(filterType, param, movies))
		},
		editMovieData: (url, movie) => {
			dispatch(editMovieMW(url, movie))
		},
		deleteMovieData: (url, id) => {
			dispatch(deleteMovieMW(url, id))
		},
		getHallsData: (url => {
			dispatch(getHalls(url))
		}),
		getCashiersData: (url => {
			dispatch(getCashiers(url))
		}),
		AddHall: (url, hall) => {
			dispatch(createHall(url, hall))
		},		
		AddCashier: (url, cashier) => {
			dispatch(createCashier(url, cashier))
		},
		DeleteErrors: (() => {
			dispatch(DeleteErrors())
		})
	})
)(AdminContainer);