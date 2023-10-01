import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

interface MapProps {
    center: {lat: number, lng: number}
}

export default function Map({center}: MapProps): JSX.Element {
    const { isLoaded } = useLoadScript({googleMapsApiKey: "AIzaSyCQiI-0DC0AYdgn2s4Nz-PXKKmR-41Zc-U"})

    if(!isLoaded) return <div>Loading....</div>

    return (
//        <div>
            <GoogleMap
                zoom={10}
                center={center}
                mapContainerClassName="map-container"
                >
                <Marker position={{ lat: -34.397, lng: 150.644 }} />
            </GoogleMap>
        //</div>
        );
}