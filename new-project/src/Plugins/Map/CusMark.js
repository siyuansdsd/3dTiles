import { Marker, InfoWindow } from "@react-google-maps/api"
import { useState } from "react"
import InfoController from "./InfoController"

const CusMark = ({position, key, marks, setmarks}) => {

    const text = `$this is the place ${position} `

    const [infoShow, setinfoShow] = useState(false)

    return (
            <Marker 
                position={position}
                key={key}
                clickable={true}
                onClick={() => setinfoShow(true)}
            >
                { infoShow &&
                <InfoWindow key={key} position={position} onCloseClick={() =>setinfoShow(false)} className="min-h-100 min-w-110">
                    <InfoController position={position} index={key} marks={marks} setmarks={setmarks} className="min-h-full min-w-full"  />
                </InfoWindow>
                }
            </Marker>
    )
}

export default CusMark