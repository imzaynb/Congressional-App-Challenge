import React from "react";
import {LocationCard} from "@/components/location-card";
import {LatLng} from "@/types/latlng";
import {getLatLngFromAddress} from "@/lib/geocode";
export const getBusinessDetails = (placeId: string, map: google.maps.Map, coords:LatLng) => {
    const request = {
        placeId: placeId,
        fields: ["photos", "rating", "icon", "name", "type", "website", "formatted_address", "formatted_phone_number", "geometry"],
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

            if(!photo) {
                return;
            }

            console.log(photo[0]);

            if(!rating) {
                return;
            }
            if(!icon) {
                return;
            }
            if(!name) {
                return;
            }
            if(!type) {
                return;
            }
            if(!website) {
                return;
            }
            if(!address) {
                return;
            }
            if(!phone) {
                return;
            }
            const tang:string = type[0];

            LocationCard({photo, rating, icon, name, type: tang, website, address, phone, coords});

        }
    });
}

export const getPlaceIdFromQuery = async (query: string, map: google.maps.Map) => {
    let res = "";
    let service;
    const request = {
        query: query,
        fields: ["place_id"],
    };

    const coords = await getLatLngFromAddress("2595 S Rochester Rd, Rochester Hills, MI 48307");

    if(!coords) {
        return;
    }

    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            console.log(results[0].place_id);
            if(!results[0].place_id) {
                return;
            }
            res = results[0].place_id;
            getBusinessDetails(res, map, coords);
        }
    });

}
