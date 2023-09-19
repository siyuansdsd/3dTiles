// Note: Map Info Controller
import { useState, useEffect } from "react"
import axios from "axios"

const InfoController = ({position, index, setmarks}) => {

    const [data, setdata] = useState('')
    const [load, setload] = useState(false)
    useEffect(() => {
        const request_website = `https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=${position.lat},${position.lng}&key=${process.env.REACT_APP_API_KEY}`
        axios.get(request_website).then(res => {
            setdata((res.data.results[0].formatted_address))
        })

    }, [])

    const delete_mark = (e) => {
        setmarks(prev => prev.filter(mark => mark !== position))
    }
    setTimeout(() => {
        setload(true)
    }, 400)

    return (
        <>
        {!load &&
        <div>loading...</div>}
        {load &&
        <div className="flex-col min-w-full min-h-100">
            <div className="flex-wrap flex-col w-auto">
                <div>place: {data}</div>
                <div>lat: {position.lat}</div>
                <div>lng: {position.lng}</div>
            </div>
            <div className="flex-row flex">
            <button onClick={() => delete_mark()} className="min-h-10 min-w-0.5 bg-red-600 p-1 rounded-lg hover:bg-red-400">delete it</button>
            <button className="min-h-10 min-w-0.5 bg-green-600 p-1 rounded-lg hover:bg-green-400 ml-auto">add a new event</button>
            </div>
        </div>
        }
        </>
    )
}

export default InfoController