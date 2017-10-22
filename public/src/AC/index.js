import {CREATE_ADMIN, CREATE_HALL,
		CREATE_MOVIE, CREATE_CASHIER,
		SET_MOVIES, SORT_MOVIE, FILTER_MOVIE, SET_MOVIE_DAYS, EDIT_MOVIE, DELETE_MOVIE,
		SET_HALLS, SET_CASHIERS, IS_AUTH, SET_SUCCESS, DELETE_SUCCESS, SET_ERROR, 
		DELETE_ERROR, DELETE_ERRORS} from '../actions';

export function Auth(auth) {
	return {
		type: IS_AUTH,
		auth
	}
}

export function setAdmin(admin) {
	return {
		type: CREATE_ADMIN,
		admin
	}
}

export function setHall(hall) {
	return {
		type: CREATE_HALL,
		hall
	}
}

export function setMovie(movie) {
	return {
		type: CREATE_MOVIE,
		movie
	}
}

export function setMovies(movies) {
	return {
		type: SET_MOVIES,
		movies
	}
}

export function setMovieDays(days) {
	return {
		type: SET_MOVIE_DAYS,
		days
	}
}

export function sortMovies(sortType, sortOrder, movies) {
	return {
		type: SORT_MOVIE,
		sortType,
		sortOrder,
		movies
	}
}

export function filterMovies(filterType, param, movies) {
	return {
		type: FILTER_MOVIE,
		filterType,
		param,
		movies
	}
}

export function editMovie(movie) {
	console.log('movie11', movie);
	return {
		type: EDIT_MOVIE,
		movie
	}
}

export function deleteMovie(data) {
	return {
		type: DELETE_MOVIE,
		data
	}
}

export function setHalls(halls) {
	return {
		type: SET_HALLS,
		halls
	}
}

export function setCashiers(cashiers) {
	return {
		type: SET_CASHIERS,
		cashiers
	}
}

export function setCashier(cashier) {
	return {
		type: CREATE_CASHIER,
		cashier
	}
}

export function success(success) {
	return {
		type: SET_SUCCESS,
		success
	}
}

export function deleteSuccess(id) {
	return {
		type: DELETE_SUCCESS,
		id
	}
}

export function ErrorsAC(error) {
	return {
		type: SET_ERROR,
		error
	}
}

export function DeleteErrors() {
	return {
		type: DELETE_ERRORS
	}	
}

export function DeleteError(id) {
	return {
		type: DELETE_ERROR,
		id
	}
}