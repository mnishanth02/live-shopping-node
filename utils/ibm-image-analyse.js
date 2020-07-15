const VisualRecognitionV4 = require('ibm-watson/visual-recognition/v4');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs')

const visualRecognition = new VisualRecognitionV4({
    version: '2019-02-11',
    authenticator: new IamAuthenticator({
        apikey: 'd-zi4d7lhhQ6T8zNcvP4w5Vx01sGOEwLo0VCcAScUJEZ',
    }),
    disableSslVerification: false,
    url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/adbd49fc-e5bc-45dc-9719-7e9704cb691a',
});


const params = {
    imagesFile: [
        {
            data: fs.createReadStream('./src/images/iphone.jpg'),
            contentType: 'image/jpeg',
        },

    ],
    // collectionIds: ['5826c5ec-6f86-44b1-ab2b-cca6c75f2fc7'],
    // features: ['objects'],
};

visualRecognition.analyze(params)
    .then(response => {
        console.log(JSON.stringify(response.result, null, 2));
    })
    .catch(err => {
        console.log('error: ', err);
    });




