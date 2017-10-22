import {CREATE_ADMIN, ADMIN_DATA} from '../actions';

export default function Admins(state = [], action) {	
	switch(action.type) {
		case ADMIN_DATA:
			return [
				...state,
				action.admin
			]
	}

	return state;
}