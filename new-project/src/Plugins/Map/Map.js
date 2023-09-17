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
    return (
        <GoogleMap zoom={17.65} center={{lng: 153.0139
            ,lat: -27.4975}} mapContainerClassName="map"></GoogleMap>
    )
}