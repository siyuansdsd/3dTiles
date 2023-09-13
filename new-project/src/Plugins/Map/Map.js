import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

export default function Home() {
    const { isLoaded } = useLoadScript({"googleMapsApiKey": process.env.MAP_API_KEY})
    console.log(process.env.MAP_API_KEY)
    if (!isLoaded) return (<div>Loading...</div>)
    return (
        <div className="Map">
            <Map />
        </div>
    );
}

const Map = () => {
    return (
        <GoogleMap zoom={10} center= {{lat: 27.4975, lng:153.0137}} mapContainerClassName="map-container"></GoogleMap>
    )
}