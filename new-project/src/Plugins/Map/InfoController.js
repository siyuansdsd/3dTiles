// Note: Map Info Controller
import { useState, useEffect } from "react"
import axios from "axios"
import useModal from "../../Hooks/useModal"
import Modal from "../Content/Modal"

const InfoController = ({position, id, setmarks}) => {

    const [placeName, setPlaceName] = useState('')
    const [load, setload] = useState(false)
    // const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({})
    
    const {showModal, toggle} = useModal()
    const handleSubmit = (event) => {
      event.preventDefault()
      console.log(formData)
    //   setShowModal(false)
    }

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
        <div id="authentication-modal">
        {!load &&
        <div>loading...</div>}
        {load &&
        <div className="flex-col min-w-full min-h-100">
            <div className="flex-wrap flex-col w-auto">
                <div className=" font-extrabold font-sans">place: {placeName}</div>
                <div className=" font-bold font-sans mr-auto pr-auto">lat: {position.lat}</div>
                <div className=" font-bold font-sans ">lng: {position.lng}</div>
            </div>
            <div className="flex-row flex">
            <button onClick={() => delete_marks({id: id, data: position})} className=" font-bold font-sans min-h-10 min-w-0.5 bg-red-600 p-1 rounded-lg hover:bg-red-400">delete it</button>
            <button onClick={ toggle } className=" font-bold font-sans min-h-10 min-w-0.5 bg-green-600 p-1 rounded-lg hover:bg-green-400 ml-auto">add a new event</button>
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
        />
        </div>
    )
}

export default InfoController