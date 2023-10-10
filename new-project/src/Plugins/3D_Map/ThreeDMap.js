import { Wrapper } from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import {
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    AmbientLight,
    Matrix4 
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from "three";

const mapOptions = {
    center: {lng: 153.0131, lat: -27.49675},
    zoom: 19,
    disableDefaultUI: true,
    headding: 25,
    tilt: 75,
    mapId: '8a6c2a82177438dc',
};

console.log(process.env.REACT_APP_MAP_ID)

const ThreeDMap = () => {
    return (
        <>
        <Wrapper apiKey={ process.env.REACT_APP_API_KEY }>
            <MyMap />
        </Wrapper>
        </>
    )
}

function MyMap () {
    const [map, setMap] = useState()
    const mapRef = useRef()
    const overlayRef = useRef()
    
    useEffect(()=>{
        if (!overlayRef.current) {
        const instance = new window.google.maps.Map(mapRef.current, mapOptions)
        setMap(instance)
        overlayRef.current = createOverLay(instance)
        }
    }, [])

    return <div ref={mapRef} id="map" className=" w-full h-screen"/>
}

function createOverLay(map) {
    const overlay = new window.google.maps.WebGLOverlayView()
    let renderer, scene, camera, loader
    
    overlay.onAdd = () => {
        scene = new Scene()
        camera = new PerspectiveCamera()
        const light = new AmbientLight(0xffffff, 1.0)
        scene.add(light)
        loader = new GLTFLoader()
        loader.loadAsync('/buster_drone/scene.gltf').then(
            object => {
                const group = object.scene
                group.scale.setScalar(8)
                group.rotateOnWorldAxis(new Vector3(1, 0, 0), Math.PI / 2)
                scene.add(group)
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
            lat: mapOptions.center.lat,
            lng: mapOptions.center.lng,
            altitude: 47
        })
        camera.projectionMatrix = new Matrix4().fromArray(matrix)
        overlay.requestRedraw()
        renderer.render(scene, camera)
        renderer.resetState()
    }

    overlay.setMap(map)
}

export default ThreeDMap