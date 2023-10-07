// Note: Map Info Controller
import { useState, useEffect } from "react"
import axios from "axios"
import useModal from "../../Hooks/useModal"
import Modal from "../Content/Modal"

const InfoController = ({position, id, setmarks, setloaded}) => {

    const [placeName, setPlaceName] = useState('')
    const [load, setload] = useState(false)
    // const [showModal, setShowModal] = useState(false)
    
    const {showModal, toggle} = useModal()

    useEffect(() => {
        const request_website = `https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=${position.lat},${position.lng}&key=${process.env.REACT_APP_API_KEY}`
        axios.get(request_website).then(res => {
            setPlaceName((res.data.results[0].formatted_address))
        })

    }, [])

    const delete_marks = (data) => {
        // axios.delete(`http://localhost:3002/marks/`, data.id).then(() => {
        //     setmarks(prev => prev.filter(mark => mark !== data.data))
        // }).catch(err => {
        //     console.log(err)
        // })
        setmarks(prev => prev.filter(mark => mark.data !== data.data))
    }

    setTimeout(() => {
        setload(true)
    }, 400)

    return (
        <div id="authentication-modal" className=" m-5">
        {!load &&
        <div>loading...</div>}
        {load &&
        <div className="flex-col min-w-full min-h-100 border-l-rose-50 border-spacing-1 border p-4 m-0 rounded-lg">
            <div className="flex-wrap flex-col w-auto mb-9 p-3 ">
                <div className=" text-left text-lg text-rose-50 mb-3"> Are you going to build Event here? </div>
                <div className=" font-extrabold font-sans text-base text-rose-50">Place: {placeName}</div>
                <hr />
                <div className=" font-bold font-sans mr-auto pr-auto  text-rose-50 mt-3">{`(lat: ${position.lat}, lng: ${position.lng})`}</div>
            </div>
            <div className="flex-row flex">
            <button onClick={() => delete_marks({id: id, data: position})} className=" p-2 text-rose-50 font-bold font-sans min-h-10 min-w-0.5 bg-rose-500 rounded-lg hover:bg-rose-200">delete it</button>
            <button onClick={ toggle } className=" p-2 text-rose-50 font-bold font-sans min-h-10 min-w-0.5 bg-indigo-500 rounded-lg hover:bg-indigo-200 ml-auto">add a new event</button>
            </div>
        </div>
      
        }
        <Modal 
            hide={toggle}
            isShowing={showModal}
            place={position}
            placeN={placeName}
            id={id}
            setmarks={setmarks}
            data = {{id: id, data: position}}
            delete_marks={delete_marks}
            setloaded={setloaded}
        />
        </div>
    )
}

export default InfoController