export const getBusinessDetails = (placeId: string, map: google.maps.Map) => {
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


    }
  });
}

export interface Printwap {
  photo: string | undefined,
  rating: number | undefined,
  icon: string | undefined,
  name: string | undefined,
  type: string | undefined,
  website: string | undefined,
  address: string | undefined,
  phone_number: string | undefined
}

export const getPlaceIdFromQuery = async (query: string, map: google.maps.Map): Promise<string | null> => {
  const request = {
    query: query,
    fields: ["place_id"],
  };
  let placeId = null;
  let service = new google.maps.places.PlacesService(map);
  await service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      console.log(results[0].place_id);
      if (!results[0].place_id) {
        return;
      }
      placeId = results[0].place_id;
      return;
    }
  });

  return placeId;
}