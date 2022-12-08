import { loadingConstants } from "../constants/loading";

export const showLoading = () => {
    return (dispatch) => {
        dispatch({
            type: loadingConstants.SHOW_LOADING
        })
    };
};

export const hideLoading = () => {
    return (dispatch) => {
        dispatch({
            type: loadingConstants.HIDE_LOADING
        })
    };
};