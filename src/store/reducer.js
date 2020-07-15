import * as constants from "./constants";

const initialState = {
    login: false,
    error: false
}

function reducer (state = initialState, action) {
	switch (action.type) {
		case constants.LOGIN_SUC: 
			return {
				...state,
				login: true,
				error: false
			}
		case constants.LOGIN_FAI:
			return {
				...state,
				error: true
			}
		case constants.LOGIN_EXP:
			return {
				login: false,
				error: false
			}
		default:
			return state
	}
}

export default reducer;