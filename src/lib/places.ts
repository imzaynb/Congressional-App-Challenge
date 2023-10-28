export const placeMarker = (placeId: string, map: google.maps.Map) => {
    const request = {
        placeId: placeId,
        fields: ["name", "formatted_address", "place_id", "geometry"],
    };

    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
        if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
        ) {
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
            });

            google.maps.event.addListener(marker, "click", () => {
                const nameElement = place.name;
                const placeIdElement = place.place_id;
                const placeAddressElement = place.formatted_address;
                console.log(nameElement);
            });
        }
    });
}

