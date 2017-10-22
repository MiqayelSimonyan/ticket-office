import {CREATE_CASHIER, SET_CASHIERS} from '../actions';

export default function Cashiers(state = [], action) {	
	switch(action.type) {
		case CREATE_CASHIER:
			return [
				...state,
				action.cashier
			]
		case SET_CASHIERS:
			return [
				...action.cashiers
			]
	}

	return state;
}