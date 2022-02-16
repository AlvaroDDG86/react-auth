import React, { useState } from 'react'
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('idToken')
    const [token, setToken] = useState(initialToken)

    const isLoggedIn = !!token

    const loginHandler = (token) => {
        setToken(token)
        localStorage.setItem('idToken', token)
    }
    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('idToken')
    }

    return (<AuthContext.Provider value={{
        token,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }}>
        { props.children }
    </AuthContext.Provider>)
}

export default AuthContext