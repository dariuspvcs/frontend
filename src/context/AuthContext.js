import { createContext, useEffect, useReducer } from "react";
import { useLogout } from "../hooks/useLogout";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return {user: action.payload};
        case 'LOGOUT':
            return {user: null};
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            fetch('/api/user/auth', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then(async (response) => {
                const json = await response.json();
                if(json === false) {
                    localStorage.removeItem('user');
                    dispatch({type: 'LOGOUT'})
                } else {
                    dispatch({type: 'LOGIN', payload: user});
                }
            })  
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}