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
        }
    });
}



