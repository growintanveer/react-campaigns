import { campaignListContants } from "../constants/campaignList";

const initialState = {
    loading: false,
    campaignList: [],
    filteredCampaignsList: [],
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
                campaignList: action.data,
                filteredCampaignsList: action.data
            };
        case campaignListContants.GET_CAMPAIGN_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case campaignListContants.GET_FILTERED_CAMPAIGN:
            return {
                ...state,
                filteredCampaignsList: action.data
            };
        default:
            return state;
    }
};

export default CampaignLists;