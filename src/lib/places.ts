import React from "react";
export const getBusinessDetails = (placeId: string, map: google.maps.Map) => {
    const request = {
        placeId: placeId,
        fields: ["photo", "rating", "icon", "name", "type", "website", "formatted_ address", "formatted_phone_number", "geometry"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
        if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place && place.geometry && place.geometry.location
        ) {
            const photo = place.photos;
            const rating = place.rating;
            const icon = place.icon;
            const name = place.name;
            const type = place.types;
            const website = place.website;
            const address = place.formatted_address;
            const phone = place.formatted_phone_number;

            console.log(photo);
            console.log(rating);
            console.log(icon);
            console.log(name);
            console.log(type);
            console.log(website);
            console.log(address);
            console.log(phone);
        }
    });
}

export const getPlaceIdFromQuery = async (query: string, map: google.maps.Map): Promise<string>=> {
    let res = "";
    let service;
    const request = {
        query: query,
        fields: ["place_id"],
    };

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log(results[0].place_id);
            //HELP ZAYNN HNASDFUIASUIFASHDFASDFASDASD
           // res = results[0].place_id; RUN FIRST AND THEN FIGURE THIS OUT IT LITTERALY WORKSSSSSSSSSSSS LOOK AT THE CONSOLE.LOG!!!!!!
        }
    });

    return res;

}

