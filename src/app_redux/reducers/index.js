import { combineReducers } from "redux";
import campaignList from './campaignList'


const rootReducer = combineReducers({
    campaignList: campaignList,
})

export default rootReducer;