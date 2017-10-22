import axios from 'axios';
import shortid from 'shortid';
import Auth from '../auth';
import {setAdmin, setHall, setMovie, setMovies, editMovie, deleteMovie,
        setCashier, setHalls, setCashiers, setMovieDays, 
        ErrorsAC, success} from '../AC';

function adminSuccess(admin, dispatch, props) {
  if (!admin.username) throw new Error(admin.message);
    dispatch(setAdmin(admin));    
    if (admin && admin.username) {
      Auth.authenticate('auth', true);
      Auth.authenticate('username', admin.username);
      dispatch(success({id: shortid.generate(), message: admin.message}));
      props.history.push('/admin');
    }
}

const config = (method, data) => {
  return {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method,
      credentials: 'include',
      body: JSON.stringify(data)
  }
}

export function createAdmin(url, data, props) {
  return (dispatch) => {
    fetch(url, config('POST', data))
    .then(response => {
      return response.json();
    })
    .then(admin => {      
      adminSuccess(admin, dispatch, props);
    })
    .catch((err) => {
      dispatch(ErrorsAC({id: shortid.generate(), message: err}));
    });
  }
}

export function login(url, data, props) {
  return (dispatch) => {
    fetch(url, config('POST', data))
    .then(response => {
      return response.json();
    })
    .then(admin => {
      adminSuccess(admin, dispatch, props);
    })
    .catch((err) => {
      dispatch(ErrorsAC({id: shortid.generate(), message: err}));
    });
  }
}

export function createHall(url, hall) {
  return (dispatch) => {
    fetch(url, config('POST', hall))
      .then(response => {
        return response.json();
      })
      .then(hall => {
        if (!hall.name) throw new Error(hall.message);
        dispatch(setHall(hall));
        dispatch(success({id: shortid.generate(), message: hall.message}));
      })
      .catch((err) => {
        dispatch(ErrorsAC({id: shortid.generate(), message: err}));
      });
  }
}

export function createMovie(url, movie) {
  return (dispatch) => {
    fetch(url, config('POST', movie))
      .then(response => {
        return response.json();
      })
      .then(movie => {
        if (!movie.hall || !movie.name || !movie.startTime ||
            !movie.day || !movie.duration || !movie.price) throw new Error(movie.message);
              dispatch(setMovie(movie))
              dispatch(success({id: shortid.generate(), message: movie.message}));
      })
      .catch((err) => {
        dispatch(ErrorsAC({id: shortid.generate(), message: err}));
      });
  }
}

export function getMovies(url) {
  return (dispatch) => {
    axios.get(url)
      .then(response => {
        if (!response.data) throw new Error(response.message);
        return dispatch(setMovies(response.data));
      })
      .catch((err) => console.error('err', err));
  }
}

export function getMovieDays(url) {
  return (dispatch) => {
    axios.get(url)
      .then(response => {      
        if (!response.data) throw new Error(response.message);
        return dispatch(setMovieDays(response.data))
      })
      .catch((err) => console.error('err', err));
  }
}

export function editMovieMW(url, movie) {
  return (dispatch) => {
    fetch(url, config('PUT', movie))
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (!data.movie.hall) throw new Error(data.message);
        dispatch(editMovie(data.movie));
        dispatch(success({id: shortid.generate(), message: data.message}));
      })
      .catch((err) => {
        dispatch(ErrorsAC({id: shortid.generate(), message: err}));
      });
  }
}

export function deleteMovieMW(url, id) {  
  return (dispatch) => {
    fetch(url, config('DELETE', {id}))
      .then(response => {
        return response.json();
      })
      .then(movie => {
        if (!movie) throw new Error(movie.message);
        dispatch(deleteMovie(movie));
        dispatch(success({id: shortid.generate(), message: movie.message}));
      })
      .catch((err) => {
        dispatch(ErrorsAC({id: shortid.generate(), message: err}));
      });
  }
}

export function createCashier(url, cashier) {
  return (dispatch) => {
    fetch(url, config('POST', cashier))
      .then(response => {
        return response.json();
      })
      .then(cashier => {
        if (!cashier.username) throw new Error(cashier.message);
        dispatch(setCashier(cashier));
        dispatch(success({id: shortid.generate(), message: cashier.message}));
      })
      .catch((err) => {
        dispatch(ErrorsAC({id: shortid.generate(), message: err}));
      });
  }
}

export function getHalls(url) {
  return (dispatch) => {
    axios.get(url)
      .then(response => {      
        if (!response.data) throw new Error(response.message);
        return dispatch(setHalls(response.data));
      })
      .catch((err) => console.error('err', err));
  }
}

export function getCashiers(url) {
  return (dispatch) => {
    axios.get(url)
      .then(response => {      
        if (!response.data) throw new Error(response.message);
        return dispatch(setCashiers(response.data))
      })
      .catch((err) => console.error('err', err));
  }
}