export const getBusinessDetails = (placeId: string, map: google.maps.Map): Printwap | null => {
  const request = {
    placeId: placeId,
    fields: ["photo", "rating", "icon", "name", "type", "website", "geometry"],
  };

  const service = new google.maps.places.PlacesService(map);
  let printwap: Printwap | null = null;

  service.getDetails(request, (place, status) => {
    if (
      status === google.maps.places.PlacesServiceStatus.OK &&
      place && place.geometry && place.geometry.location
    ) {
      printwap = {
        photo: place.photos,
        rating: place.rating,
        icon: place.icon,
        name: place.name,
        type: place.types,
        website: place.website,
      }
      console.log(printwap)
      return printwap;
    }
  });

  return printwap;
}

export interface Printwap {
  photo: google.maps.places.PlacePhoto[] | undefined,
  rating: number | undefined,
  icon: string | undefined,
  name: string | undefined,
  type: string[] | undefined,
  website: string | undefined,
}



