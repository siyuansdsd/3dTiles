import { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext()

export const Context = ({children}) => {

    const raw_status = Cookies.get('Auth')
    const status = raw_status === 'true' ? true : false
    const [Auth, setAuth] = useState(status)

    return (
        <AuthContext.Provider value={{Auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}
