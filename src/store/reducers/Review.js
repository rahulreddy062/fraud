import * as actionTypes from '../actions/actionTypes';
const initialState = {
    reviews: [
        {

        }
    ]
}
const getHistory = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.HISTORYTRANSACTIONS:
            const receivedReviews = action.json;
            let updatedReviews = { ...state.reviews };
            updatedReviews = receivedReviews;
            state.reviews = updatedReviews;
            console.log(state);
            return state;
        case actionTypes.POSTTRANSACTIONS:
            console.log(action.key);
            let updatedStateReviews = { ...state.reviews }
            delete updatedStateReviews[action.key];
            state.reviews = updatedStateReviews;
            return state;
        case actionTypes.DELETETRANSACTIONS:
            let updatedStateReviewsDelete = { ...state.reviews }
            delete updatedStateReviewsDelete[action.key];
            state.reviews = updatedStateReviewsDelete;
            return state;
        default:
            return state;

    }
}
export default getHistory;