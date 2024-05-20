import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // const navigate = useNavigate();
    const auth = () => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('user') == '' || !localStorage.getItem('user')) {
            }
            else {
                return JSON.parse(localStorage.getItem("user"));
            }

        }


    }
    const setAuth = (auth) => {
        localStorage.setItem("user", JSON.stringify(auth))
    }


    // const user = () => {

    // }

    // const setUser = (user) => {

    // }


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;