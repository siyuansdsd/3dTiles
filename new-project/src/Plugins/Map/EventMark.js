import { Marker, InfoWindow } from "@react-google-maps/api"
import { useState, useEffect } from "react"
import block_icon from "../../icons/block.png"
import common_icon from "../../icons/show.png"
import repair_icon from "../../icons/repair.png"
import superviser_icon from "../../icons/sup.png"
import traffic_icon from "../../icons/traffic.png"
import EventInfoController from "./EventInfoController"

const CusMark = ({position, id, key, marks, setmarks, type, name, time, description}) => {

    const [eventShow, setEventShow] = useState(false)
    let iconSized
    const typeSelector = (type) => {
        switch (type) {
            case "Block":
                iconSized = {
                    url: block_icon,
                    scaledSize: {
                        width: 50,
                        height: 30
                    }
                }
                return
            case "Traffic":
                iconSized = {
                    url: traffic_icon,
                    scaledSize: {
                        width: 30,
                        height: 40
                    }
                }
                return
            case "Construction":
                iconSized = {
                    url: repair_icon,
                    scaledSize: {
                        width: 50,
                        height: 55
                    }
                }
                return
            case "Supervise":
                iconSized = {
                    url: superviser_icon,
                    scaledSize: {
                        width: 50,
                        height: 20
                    }
                }
                return
            default:
                iconSized = {
                    url: common_icon,
                    scaledSize: {
                        width: 40,
                        height: 40
                    }
                }
                return 
        }
    }

    typeSelector(type)

    return (
            <Marker 
                position={position}
                key={key}
                clickable={true}
                onClick={() => setEventShow(true)}
                icon={iconSized}
            >
                { eventShow &&
                <InfoWindow 
                key={key} 
                position={position} 
                onCloseClick={() =>setEventShow(false)} 
                className="min-h-100 min-w-110">
                    <EventInfoController 
                    position={position} 
                    id={id} 
                    marks={marks} 
                    setmarks={setmarks} 
                    className="min-h-full min-w-full"
                    name = {name}
                    time = {time}
                    description = {description}
                    type = {type}
                    />
                </InfoWindow>
                }
            </Marker>
    )
}

export default CusMark