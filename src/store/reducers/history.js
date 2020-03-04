import * as actionTypes from '../actions/actionTypes';
const initialState = {
    reviews: [
        {

        }
    ]
}

const getReviewHistory = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REVIEWEDTRANSACTIONS:
            const receivedReviews = action.json;
            let updatedReviews = { ...state.reviews };
            updatedReviews = receivedReviews;
            state.reviews = updatedReviews;
            console.log(state);
            return state;
        default:
            return state;

    }
}
export default getReviewHistory;