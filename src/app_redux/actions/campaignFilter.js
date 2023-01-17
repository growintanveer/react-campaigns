import { campaignListContants } from "../constants/campaignList";

export const filterCampaign = (filters) => {

    return (dispatch, getState) => {

        const { campaignList } = getState().campaignList;
        const filteredCampaigns = getFilteredCampaigns(campaignList, filters);

        dispatch(campaignListFilterRequest(filteredCampaigns))
    };
};


const campaignListFilterRequest = (data) => ({
    type: campaignListContants.GET_FILTERED_CAMPAIGN,
    data: data
});

const getFilteredCampaigns = (campaignList, filters) => {
    let filteredCampaigns = [];
    let hasFilter = false;

    if(!filters.name && (filters.dateRange.startDate && filters.dateRange.endDate)) {
        filteredCampaigns = campaignList.filter((campaign) => {
            return Date.parse(campaign.startDate) >= Date.parse(filters.dateRange.startDate) && 
                    Date.parse(campaign.endDate) <= Date.parse(filters.dateRange.endDate)
        });
    }

    if(filters.name && (filters.dateRange.startDate && filters.dateRange.endDate)) {
        filteredCampaigns = campaignList.filter((campaign) => {
            return Date.parse(campaign.startDate) >= Date.parse(filters.dateRange.startDate) && 
                    Date.parse(campaign.endDate) <= Date.parse(filters.dateRange.endDate) &&
                    campaign.name.toLowerCase().includes(filters.name.toLowerCase())
        });
    }
    
    if(filters.name && !(filters.dateRange.startDate && filters.dateRange.endDate)) {
        filteredCampaigns = campaignList.filter((campaign) => {
            return campaign.name.toLowerCase().includes(filters.name.toLowerCase())
        });
    }    

    if(filters.name !== '' || 
        (
            JSON.stringify(filters.dateRange) !== '{}' && (filters.dateRange && 
            (filters.dateRange.startDate !== null && filters.dateRange.startDate !== '') && 
            (filters.dateRange.endDate !== null && filters.dateRange.endDate !== '')))) {
        hasFilter = true;
    } else {
        hasFilter = false;
    }

    return filteredCampaigns && filteredCampaigns.length > 0 ? filteredCampaigns : (!hasFilter ? campaignList : []);
};