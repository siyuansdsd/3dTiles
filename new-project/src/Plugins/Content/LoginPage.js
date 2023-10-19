import React from 'react'
import loginImg from '../assets/login.jpg'
import { useContext } from 'react'
import { AuthContext } from '../../Context'
import Cookies from 'js-cookie'
import axios from 'axios'

export default function Login() {
    const AuthC = useContext(AuthContext)
    const {Auth, setAuth} = AuthC
    const submit = async(e) => {
        e.preventDefault()
        const email = e.target.email.value
        const code = e.target.code.value
        const key = email+code
        console.log(key)
        try {
            const res = await axios.get(process.env.REACT_APP_USER_URL + `/${key}`)
            if (res.status !== 200) {
                alert("please check your email and password")
                setAuth(false)
                return
            }
            setAuth(true)
            Cookies.set('Auth', 'true')

        } catch (error) {
            alert(`\u25CF email or password is wrong, please check again`)
        }
    }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="login" />
        </div>

        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8' onSubmit={e => submit(e)}>
                <h2 className='text-4xl text-rose-50 dark:text-white font-bold text-center'>SIGN IN</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Username</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name='email'/>
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Password</label>
                    <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name='code'/>
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <p>Forgot Password</p>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' type='submit'>SIGNIN</button>
                <div className=' text-sm text-rose-50 text-left mt-0'><a href='/signup'>No account? Click to create one...</a></div>
            </form>
        </div>
    </div>
  )
}
