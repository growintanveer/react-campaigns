import { campaignListContants } from "../constants/campaignList";

const initialState = {
    loading: false,
    campaignList: [],
    filteredCampaignsList: [],
    error: null
};

let filteredCampaigns = [];


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
        case campaignListContants.FILTER_CAMPAIGN_BY_DATE:
            filteredCampaigns = getFilteredCampaigns(state, action);
            return {
                ...state,
                filteredCampaignsList: filteredCampaigns
            };

        case campaignListContants.FILTER_CAMPAIGN_BY_NAME:
            filteredCampaigns = getFilteredCampaigns(state, action);
            return {
                ...state,
                filteredCampaignsList: filteredCampaigns
            };
        default:
            return state;
    }
};


const getFilteredCampaigns = (state, action) => {
    let filteredCampaigns = [];
    if(!action.data.name && (action.data.dateRange.startDate && action.data.dateRange.endDate)) {
        filteredCampaigns = state.campaignList.filter((campaign) => {
            return Date.parse(campaign.startDate) >= Date.parse(action.data.dateRange.startDate) && 
                    Date.parse(campaign.endDate) <= Date.parse(action.data.dateRange.endDate)
        });
    }

    if(action.data.name && (action.data.dateRange.startDate && action.data.dateRange.endDate)) {
        filteredCampaigns = state.campaignList.filter((campaign) => {
            return Date.parse(campaign.startDate) >= Date.parse(action.data.dateRange.startDate) && 
                    Date.parse(campaign.endDate) <= Date.parse(action.data.dateRange.endDate) &&
                    campaign.name.toLowerCase().includes(action.data.name.toLowerCase())
        });
    }
    
    if(action.data.name && !(action.data.dateRange.startDate && action.data.dateRange.endDate)) {
        filteredCampaigns = state.campaignList.filter((campaign) => {
            return campaign.name.toLowerCase().includes(action.data.name.toLowerCase())
        });
    }

    console.log("filteredCampaigns", filteredCampaigns);
    console.log("state", state);
    
    return filteredCampaigns && filteredCampaigns.length > 0 ? filteredCampaigns : state.campaignList;
};

export default CampaignLists;