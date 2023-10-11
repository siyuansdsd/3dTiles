import QRCodeGen from "./QRCodeGenerator"

const Blocker = ({data, num}) => {

    const lat = data.location.lat
    const lng = data.location.lng
    const url = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`
    const size = 200
    return (
        <div className="flex-col min-w-full min-h-100 bg-slate-600 border-gray-600 rounded-lg dark:border-gray-700 p-4 mt-9">
            <div className="flex-wrap flex-col w-auto">
            <div className=" text-left font-extrabold font-sans text-4xl text-slate-300">Event: {num}</div>
            <div className=" text-left font-extrabold font-sans text-lg text-rose-50  mt-10">Event Type: {data.type}</div>
                <div className=" font-extrabold font-sans text-lg text-white text-left mt-5">place: {data.placeName}</div>
                <hr />
                <div className=" mt-1 font-bold font-sans mr-auto pr-auto  text-rose-50  text-left">{`(lat: ${data.location.lat}, lng: ${data.location.lng})`}</div>
                <div className=" text-left mt-7 font-extrabold font-sans text-xl text-rose-50">Description of this Event :<br />
                    <div className=" mt-3 p-3 bg-slate-700 rounded-lg"> 
                        <p class="mb-3 text-rose-50 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-50 dark:first-letter:text-rose-50 first-letter:mr-3 first-letter:float-left">{data.description}</p>
                    </div>
                </div>
                <div className=" mb-3 text-left mt-7 font-extrabold font-sans text-white">Create at: {data.time}</div>
            </div>
            <QRCodeGen url={url} size={size}/>
        </div>
    )
}

export default Blocker