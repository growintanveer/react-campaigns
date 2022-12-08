import { campaignListContants } from "../constants/campaignList";

const initialState = {
    loading: false,
    campaignList: [],
    error: null
};


const CampaignLists = (state = initialState, action) => {
    switch (action.type) {
        case campaignListContants.GET_CAMPAIGN_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case campaignListContants.GET_CAMPAIGN_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                campaignList: action.data
            };
        case campaignListContants.GET_CAMPAIGN_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};

export default CampaignLists;