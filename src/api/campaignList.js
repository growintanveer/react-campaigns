import { handleResponse } from "./handleReponse";
import { appConfig } from "../app_redux/constants/appConfig";

export const getCampaignList = () => {
    const requestObj = {
        method: 'GET',
        Headers: { 'Content-Type': 'application/json' }
    }

    return fetch(
        `${appConfig.API_URL}/campaigns`,
        requestObj
    ).then(handleResponse)
};