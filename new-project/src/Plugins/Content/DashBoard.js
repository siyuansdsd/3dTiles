import axios from "axios"
import { useEffect, useState } from "react"
import Blocker from "../texts/Blocker"

const Dashboard = () => {
    const [data, setdata] = useState([])
    const [loader, setloader] = useState(false)
    const [search, setsearch] = useState('')
    const [result, setresult] = useState([data])
    const Loading = async() => {
        const res = await axios.get(process.env.REACT_APP_DB_URL)
        setdata(res.data)
        setresult(res.data)
        setloader(true)
    }
    useEffect(() => {
        if (!loader) {
            Loading()
        }
    }, [loader])

    useEffect(() => {
        const newResult = data.filter(
            (item) =>
              item.type.toLowerCase().includes(search.toLowerCase()) ||
              item.description.toLowerCase().includes(search.toLowerCase())
          )
          setresult(newResult.reverse())
    }, [setresult, result, search, data])

    let num = 0

    return (
        <div class="p-4 sm:ml-64 bg-slate-900">
        <div className=" p-2 text-3xl text-left text-rose-50 font-sans mb-1">Event waiting list :</div>
        <form onSubmit={e => e.preventDefault()} className=" items-start">
            <label htmlFor="search"></label>
                <input 
                    type="text" 
                    id="search" 
                    className=" h-16 max-w-7xl text-black w-9/12 p-2 rounded-lg border-2 border-rose-50 bg-slate-700 " 
                    placeholder="search ..." 
                    value={ search }
                    onChange={ (e) => setsearch(e.target.value) }
                    autoFocus
                    name="search"
                />
        </form>
        <div class="p-4 border-0 text-rose-50">
            {!loader && 
                <div> no event now ... </div>
            }
            {loader && 
            result.map((item) => {
                num ++
                return (
                <>  
                    <Blocker key={item.id} data={item} num={`0${num}`} setdata={setdata}/>
                </>
                )
            })}
        </div>
        </div>
    )

}

export default Dashboard