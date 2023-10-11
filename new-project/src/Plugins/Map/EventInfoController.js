// Note: Map Info Controller
import axios from "axios"
import QRCodeGen from "../texts/QRCodeGenerator"
import { useState, useEffect } from "react"

const InfoController = ({position, id, setmarks, setloaded, mark, name, time, description, type, settypedMarks}) => {

    const [placeName, setPlaceName] = useState('')
    const [load, setload] = useState(false)
    // const [showModal, setShowModal] = useState(false)

    const delete_marks = (data) => {
        // axios.delete(`http://localhost:3002/marks/`, data.id).then(() => {
        //     setmarks(prev => prev.filter(mark => mark !== data.data))
        // }).catch(err => {
        //     console.log(err)
        // })
        settypedMarks(prev => prev.filter(mark => mark.id !== data.id))
        axios.delete(process.env.REACT_APP_DB_URL + `/${data.id}`).then(() => {}).catch(err => {console.log(err)})
    }

    setTimeout(() => {
        setload(true)
    }, 400)
    const lat = position.lat
    const lng = position.lng
    const url = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    const size = 120

    return (
        <div id="authentication-modal" className="w-auto h-auto bg-slate-600 p-3 m-0" >
        {!load &&
        <div>loading...</div>}
        {load &&
        <div className="flex-col min-w-full min-h-100">
            <div className="flex-wrap flex-col w-auto">
            <div className=" text-left font-extrabold font-sans text-lg text-rose-50 ">Event Type: {type}</div>
                <div className=" font-extrabold font-sans text-lg text-white">place: {name}</div>
                <hr />
                <div className=" mt-1 font-bold font-sans mr-auto pr-auto  text-rose-50 ">{`(lat: ${position.lat}, lng: ${position.lng})`}</div>
                <div className=" text-left mt-7 font-extrabold font-sans text-xl text-rose-50">Description of this Event :<br />
                    <div className=" mt-3 p-3 bg-slate-700 rounded-lg"> 
                        <p class="mb-3 text-rose-50 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-50 dark:first-letter:text-rose-50 first-letter:mr-3 first-letter:float-left">{description}</p>
                    </div>
                </div>
                <div className=" mb-3 text-left mt-7 font-extrabold font-sans text-white">Create at: {time}</div>
            </div>
            <QRCodeGen url={url} size={size}/>
            <div className="flex-row flex mt-7">
            <button onClick={() => delete_marks({id: id, data: position})} className=" p-2 text-rose-50 font-bold font-sans min-h-10 min-w-0.5 bg-rose-500 p-1 rounded-lg hover:bg-red-200">Finished</button>
            <button className=" p-2 text-rose-50 font-bold font-sans min-h-10 min-w-0.5 bg-indigo-500 rounded-lg hover:bg-indigo-200 ml-auto">Edit</button>
            </div>
        </div>
      
        }
        </div>
    )
}

export default InfoController