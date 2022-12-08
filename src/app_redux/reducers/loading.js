import { loadingConstants } from "../constants/loading";

const initialState = {
    showLoading: false
};

const Loading = ( state = initialState, action ) => {
    switch (action.type) {
        case loadingConstants.SHOW_LOADING:
            return {
                ...state,
                showLoading: true
            };

        case loadingConstants.HIDE_LOADING:
            return {
                ...state,
                showLoading: false
            };
                
        default:
            return state;
    }
};

export default Loading;