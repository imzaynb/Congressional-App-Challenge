import { Address } from "@/types/database_types";
import { LatLng } from "@/types/latlng";
import { GoogleMap, Marker, useJsApiLoader, } from "@react-google-maps/api";
import { useCallback, useState, useEffect, CSSProperties } from "react";

interface MapComponentProps {
  center: LatLng;
  address: Address[];
  onUnmount: ((map: google.maps.Map) => void | Promise<void>) | undefined;
  onLoad: ((map: google.maps.Map) => void | Promise<void>) | undefined;
  markerOnClick: () => void;
  containerStyle: CSSProperties,
}

export default function MapComponent({ center, address, containerStyle, onLoad, onUnmount, markerOnClick }: MapComponentProps): JSX.Element {
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Render markers */}
      {address.map((address: Address, index: number) => (
        (address.icon_url ?
          (
            <Marker key={index} position={{ lat: address.lat, lng: address.lng }} onClick={markerOnClick} icon={address.icon_url} />
          ) : (
            <></>
          )
        )
      ))}

    </GoogleMap>
  );
}