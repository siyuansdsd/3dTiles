import React from "react";
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Modal = ({ isShowing, hide, place, id, setmarks}) => {

    const [formData, setFormData] = useState({
        id: '',
        type: '',
        description: '',
        time: '',
        location: '',
        placeName: ''
    })

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async(event) => {
      event.preventDefault()
      const placeName = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?language=en&latlng=${place.lat},${place.lng}&key=${process.env.REACT_APP_API_KEY}`).then(res => {
        return res.data.results[0].formatted_address
      }).catch(err => {
        alert(err)
      })

      setTimeout(() => {
        const newId = id
        let formatTime = new Date().toLocaleString()
        setFormData({
          ...formData,
          id: newId,
          time: formatTime,
          location: place,
          placeName: placeName
        })
        axios.post(`http://localhost:3002/marks`, formData).then(res => {
          console.log("add successfully")
        }).catch(err => {
          alert(err)
        })
        setmarks(prev => {prev.filter(mark => mark.data !== place)})
        hide()
      }, 500)

    }

    
    return (isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p className="mb-8">
            Do you want to Set a new event here ? <br /> {`( ${place} )`}
          </p>
          <form className="space-y-6" action="#">
                    <div>
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} id="name" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-1 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option value="" disabled selected hidden>Choose one type for this event.</option>
                            <option value="Construction">repairing</option>
                            <option value="Block">Block road</option>
                            <option value="Traffic">Dealing with traffic accidents</option>
                            <option value="Supervise">Supervise</option>
                        </select>
                    </div>
                    <div>
                        <label for="des" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">description</label>
                        <textarea value={formData.description} onChange={handleChange} type="content" name="description" id="des" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white h-52 align-baseline" placeholder="describe this event here...  eg: what is this details of this event" required />
                    </div>
                    {/* <div>
                        <label for="users" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asignee</label>
                        <select id="name" class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-1 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                            <option value="" disabled selected hidden>asignee the task to the users</option>
                            <option value="Construction">repairing</option>
                            <option value="Block">Block road</option>
                            <option value="Traffic">Dealing with traffic accidents</option>
                            <option value="Supervise">Supervise</option>
                        </select>
                    </div> */}
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Create this new event</button>
        </form>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null)
}

export default Modal;
