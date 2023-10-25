import axios from "axios"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const SignUp = () => {

    const submit = async(e) => {
        e.preventDefault()
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            code: e.target.code.value,
        }
        await axios.post(process.env.REACT_APP_USER_URL, formData).then(() => {
            console.log("add successfully")
        }).then(()=>{
            alert(`${formData.name}, you sign up successfully!`)
            e.target.reset()
        }).catch(err => {
            alert(err)
        })
    }

    return (
        <div className="p-0 h-screen sm:ml-64">
            <div class="bg-grey-lighter min-h-screen flex flex-col">
            <div className='bg-gray-800 justify-center min-h-screen '>
            <form className='max-w-[450px] w-full mx-auto rounded-lg bg-gray-900 px-8 py-72' onSubmit={e => submit(e)}>
                <h2 className='text-4xl text-rose-50 dark:text-white font-bold text-center'>SIGN UP</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Username</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="name" name="name" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Email</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name="email" />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="code"/>
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type="submit">SIGN UP</button>
                <div className=' text-sm text-rose-50 text-left mt-0'><Link href="/">Already have account? click here to log in</Link></div>
            </form >
        </div>
        </div>
        </div>
    )
}

export default SignUp