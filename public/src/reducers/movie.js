import moment from 'moment';
import {CREATE_MOVIE, SET_MOVIES, SET_MOVIE_DAYS, SORT_MOVIE, FILTER_MOVIE, EDIT_MOVIE, DELETE_MOVIE} from '../actions';

const defaultState = {
	startTime: {sortOrder: 1},
	day: {sortOrder: 1},
	duration: {sortOrder: 1},
	price: {sortOrder: 1}
}

export default function Movies(state = {}, action) {
	switch(action.type) {
		case CREATE_MOVIE:
			return {
				...state,
				data: [
					...state.data,
					action.movie					
				],
				copyData: [
					...state.copyData,
					action.movie	
				]
			}
		case SET_MOVIES:
			return {
				...defaultState,
				data: action.movies,
				copyData: action.movies
			}
		case SET_MOVIE_DAYS:
			return {
				...state,
				days: [...action.days]
			}
		case SORT_MOVIE:
			var sortType = {};
			sortType[action.sortType] = {sortOrder: action.sortOrder == 1 ? -1 : 1};

			var sortedMovies = [...action.movies].sort((a, b) => action.sortOrder == 1 ? a[action.sortType] >
						b[action.sortType] : a[action.sortType] < b[action.sortType]);

			return {
				...state,
				...sortType,
				data: sortedMovies
			}
		case FILTER_MOVIE:
			var filterMovies;
			if (action.filterType == 'Hall') {
				filterMovies = action.movies.filter(movie => {
					return movie.hall._id.toLowerCase().search(action.param.toLowerCase()) !== -1
				});
			}else {
				filterMovies = action.movies.filter(movie => moment(movie.day).format('MMM Do YY').toLowerCase().search(action.param.toLowerCase()) !== -1);
			}

			return {
				...state,
				data: filterMovies
			}
		case EDIT_MOVIE:
			console.log('action.movie', action.movie);
			state.data.forEach((item, index) => {
				if (item._id == action.movie._id) state.data[index] = action.movie;
			});

			return {
				...state,
				copyData: [...state.data]
			}
		case DELETE_MOVIE:
			return {
				...state,
				data: state.data.filter(item => item._id != action.data.id),
				copyData: state.data.filter(item => item._id != action.data.id)
			}
	}

	return state;
}