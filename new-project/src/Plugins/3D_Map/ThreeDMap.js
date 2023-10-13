import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    AmbientLight,
    Matrix4,
    BufferGeometry,
    BufferAttribute,
    LineBasicMaterial,
    Line,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";
import axios from "axios";
import chooser from "./chooser";

console.log(process.env.REACT_APP_MAP_ID)
const mapOptions = {
    center: {lng: 153.0131, lat: -27.49675},
    zoom: 19,
    disableDefaultUI: false,
    tilt: 70,
    mapId: process.env.REACT_APP_MAP_ID,
    heading: 90,
    zoomControl: true,
    mapTypeControl: false
};

const ThreeDMap = () => {
    return (<><Wrapper apiKey={ process.env.REACT_APP_API_KEY }><MyMap /></Wrapper></>)
}

function MyMap () {
    const [map, setMap] = useState()
    const mapRef = useRef()
    const overlayRef = useRef()
    // REACT_APP_DB_URL
    useEffect(()=>{
        const loadData = async() => {
            const res = await axios.get(process.env.REACT_APP_DB_URL)
            const length = res.data.length
            return res.data
        }
        if (!overlayRef.current) {
            const instance = new window.google.maps.Map(mapRef.current, mapOptions)
            setMap(instance)
            // overlayRef.current = createOverLay(instance)
            let n = 0
            loadData().then((res)=> {
                res.map((mark) => {
                    const type = mark.type
                    const icon = chooser(type).url
                    const scale = chooser(type).scale
                    const lat = mark.location.lat
                    const lng = mark.location.lng
                    createOverLay(instance, icon, lat, lng, scale )
                })
            })
        }
    }, [])

    return <div ref={mapRef} id="map" className=" w-full h-screen"/>
}

function createOverLay(map, icon, lat, lng, scale ) {
    const overlay = new window.google.maps.WebGLOverlayView()
    let renderer, scene, camera, loader
    
    overlay.onAdd = () => {
        scene = new Scene()
        camera = new PerspectiveCamera()
        const light = new AmbientLight(0xffffff, 1.2)
        scene.add(light)
        loader = new GLTFLoader()
        loader.loadAsync(icon).then(
            object => {
                const group = object.scene
                group.scale.setScalar(scale)
                group.rotateOnWorldAxis(new Vector3(1, 0, 0), Math.PI / 2)
                group.position.setZ(-70)
                scene.add(group)
                // add line
                // add bottom line
                const LineGeometry_bottom = new BufferGeometry()
                const positions_bottom = new Float32Array([0, 0, 0, 0, 0, -150])
                LineGeometry_bottom.setAttribute('position', new BufferAttribute(positions_bottom, 3))
                const lineMaterial = new LineBasicMaterial({ color: 0x00ff00 })
                const line_bottom = new Line(LineGeometry_bottom, lineMaterial)
                // add top line
                const LineGeometry_top = new BufferGeometry()
                const positions_top = new Float32Array([0, 0, 0, 0, 0, 60])
                LineGeometry_top.setAttribute('position', new BufferAttribute(positions_top, 3))
                const line_top = new Line(LineGeometry_top, lineMaterial)
                scene.add(line_bottom)
                scene.add(line_top)
                // add text

            }
        )
    }

    overlay.onContextRestored = ({ gl }) => {
        renderer = new WebGLRenderer({
            canvas: gl.canvas,
            context: gl,
            ...gl.getContextAttributes()
        })
        renderer.autoClear = false
    }

    overlay.onDraw = ({transformer}) => {
        const matrix = transformer.fromLatLngAltitude({
            lat: lat,
            lng: lng,
            altitude: 120
        })
        camera.projectionMatrix = new Matrix4().fromArray(matrix)
        overlay.requestRedraw()
        renderer.render(scene, camera)
        renderer.resetState()
    }

    overlay.setMap(map)
}
export default ThreeDMap