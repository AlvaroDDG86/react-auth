import React, { useState } from 'react'
const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null)

    const isLoggedIn = !!token
    const loginHandler = (token) => { setToken(token) }
    const logoutHandler = () => { setToken(null) }

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