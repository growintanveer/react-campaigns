export const handleResponse = (response) => {
    // console.log("HANDLE RESPONSE");
    // console.log(response);

    if (typeof response.text !== "undefined") { 
        return response.text().then((text) => {
            const data = text && JSON.parse(text);
    
            if(!response.ok) {
                if(response.status === 400) {
                    return Promise.reject(data);
                }
    
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
    
            return data;
    
        });
    } else {
        return response;
    }

    
};