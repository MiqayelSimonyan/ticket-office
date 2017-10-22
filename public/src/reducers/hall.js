import {CREATE_HALL, SET_HALLS} from '../actions';

export default function Halls(state = [], action) {	
	switch(action.type) {
		case CREATE_HALL:
			return [
				...state,
				action.hall
			]
		case SET_HALLS:
			action.halls.unshift({ _id: '' })
			return [
				...action.halls
			]
	}

	return state;
}