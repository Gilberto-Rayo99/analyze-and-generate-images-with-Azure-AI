// Create a new Azure Image Analysis API of Computer Vision 
// https://comvision-gitskills.cognitiveservices.azure.com/



const request = require('request');

export const isConfiguredAzure = () => {
    if (!process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY || !process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT) {
        return false;
    }
    return true;
}

export async function analyzeImage(url) {
    const subscriptionKey = process.env.REACT_APP_AZURE_COMPUTER_VISION_KEY;
    const uriBase = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;
    const params = {
        'captionResults': true, // Add captionResults to the params
        'caption': true,
        'visualFeatures': 'Categories,Description,Color,Tags',
        'details': '',
        'language': 'en'
        
    };

    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + url + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    };

    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            if (error) {
                console.log('Error: ', error);
                reject(error);
            } else {
                let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
                resolve(jsonResponse);
            }
        });
    });
}


