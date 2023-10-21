export default function getBusinessInfo() {
    //Example query returning business information.
    const https = require('https');
    //What the link means: use google maps places api - (textsearch) Search through their business database through matching text - (query=resturant) - searching for resturants nearby in sydney - and then added api key at the end and specified the link to use the places library in google api
    //There are other search methods other than textsearch - https://developers.google.com/maps/documentation/places/web-service/search#:~:text=The%20Places%20API%20lets%20you,proximity%20or%20a%20text%20string
    https.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants%20in%20Sydney&key=AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U&libraries=places', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        //When all data is grabbed from the api search
        resp.on('end', () => {
            return (console.log(Buffer.from(data).toString()));
            //Have to add data to database here
        });

    }).on("error", (err) => {
        console.log("Uh oh: " + err.message);
    });
}
