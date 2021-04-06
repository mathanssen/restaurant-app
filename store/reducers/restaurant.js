import {AUTHINFO_SET} from "../actions/restaurant";

// Initial Setup
const initialState = {
    authInfo: [
        {
            isLoggedIn: false,
            userEmail: ''
        }
        ],
};

export const restaurantReducer = (state = initialState, action) => {

    switch(action.type) {
        case AUTHINFO_SET:
            const updatedAuthInfo = [...state.authInfo];
            updatedAuthInfo[0].userEmail = action.userEmail;
            updatedAuthInfo[0].isLoggedIn = action.isLoggedIn;

            return { ...state, authInfo: updatedAuthInfo }
        default:
            return state;
    }
};
