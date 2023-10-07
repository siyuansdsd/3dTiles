import { Marker, InfoWindow } from "@react-google-maps/api"
import { useState } from "react"
import InfoController from "./InfoController"
import icon from "../../icons/show.png"

const CusMark = ({position, id, key, marks, setmarks, setloaded}) => {

    const iconSized = {
        url: icon,
        scaledSize: {
            width: 40,
            height: 40
        }
    }

    const [infoShow, setinfoShow] = useState(false)

    return (
            <Marker 
                position={position}
                key={key}
                clickable={true}
                onClick={() => setinfoShow(true)}
                icon={iconSized}
            >
                { infoShow &&
                <InfoWindow 
                key={key} 
                position={position} 
                onCloseClick={() =>setinfoShow(false)} 
                className="min-h-100 min-w-110">
                    <InfoController 
                    position={position} 
                    id={id} 
                    marks={marks} 
                    setmarks={setmarks} 
                    className="min-h-full min-w-full"
                    setloaded={setloaded}  
                    />
                </InfoWindow>
                }
            </Marker>
    )
}

export default CusMark