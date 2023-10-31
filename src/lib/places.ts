export const getBusinessDetails = (placeId: string, map: google.maps.Map, businessDetailsFn: (printwap: Printwap, placeId: string) => void) => {
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

      if (!photo || !rating || !icon || !name || !type || !website || !address || !phone) {
        return;
      }

      const photoLink = photo[0].getUrl();
      const placeType = type[0];

      const printwap: Printwap = {
        photo: photoLink,
        rating: "" + rating,
        icon: icon,
        name: name,
        type: placeType,
        website: website,
        address: address,
        phone_number: phone,
      }
      businessDetailsFn(printwap, placeId);
    }
  });
}

export interface Printwap {
  photo: string | undefined,
  rating: string | undefined,
  icon: string | undefined,
  name: string | undefined,
  type: string | undefined,
  website: string | undefined,
  address: string | undefined,
  phone_number: string | undefined
}

export const getPlaceIdFromQuery = (query: string, map: google.maps.Map, placeIdFn: (placeId: string) => void): void => {
  const request = {
    query: query,
    fields: ["place_id"],
  };

  let service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      if (!results[0].place_id) {
        return null;
      }
      let placeId = results[0].place_id;
      placeIdFn(placeId);
    }
  });
}