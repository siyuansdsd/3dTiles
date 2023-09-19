import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import CusMark from "./CusMark";
import { useMemo, useState, useRef } from "react";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_API_KEY
    })
    if ( !isLoaded ) {
        return <div> your map is Loading...</div>
    }

    return (
        <div>
            <Map />
        </div>
    )
}

const Map = () => {
    const [center, setCenter] = useState({lng: 153.0131, lat: -27.49675})
    const [zoom, setZoom] = useState(18.49)

    // the center place of the map
    // const mainpoint = useMemo(() => ({lng: 153.0131, lat: -27.49675}) , [])
    const [marks, setmarks] = useState([])
    // the settings of the map
    const mapOpetions = {
        zoom : zoom,
        center : center,
        mapTypeId : 'satellite',
        mapTypeControl: false,
        tilt : 45
    }

    const click_marker = (e) => {
        const target = {lat: e.latLng.lat(), lng: e.latLng.lng()}
        setmarks(prev => {
            return [
                ...prev,
                target
            ]
        })
    }
    let map;
    return (
        <GoogleMap mapContainerClassName="map" options={ mapOpetions } onClick={ click_marker } >
            {marks.map((mark, index) => {
                return <CusMark key={index} position={mark} marks={marks} setmarks={setmarks}/>
            })}
        </GoogleMap>
    )
}