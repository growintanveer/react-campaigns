import { campaignListContants } from "../constants/campaignList";
import { getCampaignList } from "../../api/campaignList";

export const getAllCampaign = () => {

    return (dispatch) => {
        dispatch(campaignListRequest());
        getCampaignList()
            .then((response) => {
                dispatch(campaignListSuccess(response));
            })
            .catch((error) => {
                dispatch(campaignListFailure);
                console.log(error);
            })
    };

};

const campaignListRequest = () => ({
    type: campaignListContants.GET_CAMPAIGN_LIST_REQUEST
});

const campaignListSuccess = response => ({
    type: campaignListContants.GET_CAMPAIGN_LIST_SUCCESS,
    data: response.data ? response.data : []
});

const campaignListFailure = error => ({
    type: campaignListContants.GET_CAMPAIGN_LIST_FAILURE,
    error: error
});