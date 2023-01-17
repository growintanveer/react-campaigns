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
    return filteredCampaigns && filteredCampaigns.length > 0 ? filteredCampaigns : campaignList;
};