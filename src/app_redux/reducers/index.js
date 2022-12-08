import { combineReducers } from "redux";
import campaignList from './campaignList'
import Loading from "./loading";


const rootReducer = combineReducers({
    loading: Loading,
    campaignList: campaignList,
})

export default rootReducer;