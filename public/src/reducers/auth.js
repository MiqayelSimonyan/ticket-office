import {IS_AUTH} from '../actions';

export default function Auth(state = [], action) {	
	switch(action.type) {
		case IS_AUTH:
			return [
				...state,
				action.isAuth
			]
	}

	return state;
}