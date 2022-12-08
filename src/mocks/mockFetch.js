const campaignListResponse = {
    data: [
        {
            "id":2,
            "name":"Ervin Howell",
            "campaign_name":"Campaign 2",
            "username":"Antonette",
            "startDate":"2022-12-01",
            "endDate":"2022-12-07",
            "budget":50000
        },
        {
            "id":4,
            "name":"Patricia Lebsack",
            "username":"Karianne",
            "campaign_name":"Campaign 4",
            "startDate":"2022-12-10",
            "endDate":"2022-12-15",
            "budget":200000
        },
        {
            "id":5,
            "name":"",
            "username":"",
            "campaign_name":"Campaign 5",
            "startDate":"2022-12-05",
            "endDate":"2022-12-12",
            "budget":150000
        }
    ]
};

export default async function mockFetch(url) {
    switch (url) {
        case "https://crm.silagroup.co.in/apis/public/api/campaigns": {
            return campaignListResponse;
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}