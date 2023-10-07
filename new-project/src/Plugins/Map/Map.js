import { GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import CusMark from "./CusMark";
import EventMark from "./EventMark";
import { useMemo, useState, useRef, useEffect } from "react";
import axios from "axios";
import {v4 as uuid} from "uuid";

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
    const [marks, setmarks] = useState([{data: center, id:0, typed:false}])
    const [typedMarks, settypedMarks] = useState([])
    const [loaded, setloaded] = useState(false)

    const loadData = async() => {
        const res = await axios.get('http://localhost:3002/marks')
        settypedMarks(res.data)
        setloaded(true)
    }

    useEffect(() => {
        if (!loaded) {
            loadData()
            console.log("load data")
        }
    }, [loaded])
    // useEffect(() => {
    //     axios.get('http://localhost:3002/marks')
    //       .then((res) => {
    //         setmarks(res.data);
    //       })
    //       .catch((error) => {
    //         console.error('获取标记数据时出错：', error);
    //       });
    //   }, [])

    // const add_marks = (data, id) => {
    //     axios.post(`http://localhost:3002/marks`, {
    //         data:data, id: id
    //     }).then(res => {
    //         console.log("add successfully")
    //     })
    // }

    // the center place of the map
    // const mainpoint = useMemo(() => ({lng: 153.0131, lat: -27.49675}) , [])
    
    // the settings of the map
    const mapOpetions = {
        zoom : zoom,
        center : center,
        mapTypeId : 'satellite',
        mapTypeControl: false,
        tilt : 45
    }

    const click_marker = (e) => {
        const id = uuid()
        const target = {lat: e.latLng.lat(), lng: e.latLng.lng()}
        setmarks(prev => {
            return [
                ...prev,
                {data: target , id: id, typed: false}
            ]
        })
        // add_marks(target, id)
    }
    let ref
    return (
        <GoogleMap 
        mapContainerClassName="map" 
        options={ mapOpetions } 
        onClick={ click_marker }
        >
            {typedMarks && typedMarks.map((mark) => {
                return <EventMark 
                type={mark.type} 
                key={mark.id} 
                id={mark.id} 
                position={mark.location} 
                name ={mark.placeName}
                time ={mark.time}
                description={mark.description}
                mark={mark} 
                setmarks={setmarks}
                />
            })}
            {marks && marks.map((mark) => {
                return <CusMark 
                key={mark.id} 
                id={mark.id} 
                position={mark.data} 
                marks={marks} 
                setmarks={setmarks}
                setloaded={setloaded}
                />
            })}
        </GoogleMap>
    )
}