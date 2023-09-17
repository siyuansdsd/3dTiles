import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })
    if ( !isLoaded ) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Map />
        </div>
    )
}

const Map = () => {
    const mapOpetions = {
        zoom : 18.49,
        center : {lng: 153.0131, lat: -27.49675},
        mapTypeId : 'satellite',
        mapTypeControl: false,
        tilt : 45
    }
    const mainpoint = {lng: 153.0131, lat: -27.49675}
    return (
        <GoogleMap mapContainerClassName="map" options={ mapOpetions }>
            <Marker position={mainpoint} />
        </GoogleMap>
    )
}