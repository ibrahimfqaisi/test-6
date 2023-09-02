import { createContext, useContext, useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import Cookies from "js-cookie";

const AuthContext = createContext();

export function useAuth() {
    const auth = useContext(AuthContext);
    if (!auth) {
        return "Error: Empty Auth";
    }
    return auth;
}

export function AuthProvider(props) {
    const [state, setState] = useState(() => {
        // Initialize state with the token from cookies if it exists
        const tokenFromCookie = Cookies.get("token");
        const initialState = {
            token: tokenFromCookie || null,
            user: null,
        };
        return initialState;
    });

    const baseUrl = process.env.NEXT_PUBLIC_URL;

    async function login(username, password) {
        const url = baseUrl + "/api/token/";
        const option = {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        };
        const res = await fetch(url, option);
        const data = await res.json();
        const decodedToken = jwt.decode(data.access);
        console.log(decodedToken);
        Cookies.set("token", data.access, {
            expires: 1, // Set the expiration time in days
            secure: process.env.NODE_ENV !== "development",
            path: "/",
        });
        const newState = {
            token: data.access,
            user: {
                username: decodedToken.username,
                email: decodedToken.email,
                id: decodedToken.user_id,
                is_customer: decodedToken.is_customer,
                is_technician: decodedToken.is_technician
            }
        };
        setState(prevState => ({ ...prevState, ...newState }));
    }

    function logout() {
        Cookies.remove("token", {
            secure: process.env.NODE_ENV !== "development",
            path: "/",
        });

        const newState = {
            token: null,
            user: null
        };
        setState(prevState => ({ ...prevState, ...newState }));
    }

    useEffect(() => {
        // This effect will run whenever the 'state.token' changes
        // It's a good place to check for token changes after refreshing the page
        if (state.token) {
            // You can use 'state.token' for authenticated requests
        }
    }, [state.token]);

    // Add a setToken function to update the token in the context
    function setToken(access) {
        // const decodedToken = jwt.decode(token);
        const decodedToken = jwt.decode(access);
        // console.log(token,444444444444444444444444);

        // console.log(decodedToken);

        // console.log(decodedToken.username);
        const newState = {
            token: access,

            user: {
                username: decodedToken.username,
                email: decodedToken.email,
                id: decodedToken.user_id,
                is_customer: decodedToken.is_customer,
                is_technician: decodedToken.is_technician
            }
        };
        setState(prevState => ({ ...prevState, ...newState }));

    }

    return (
        <AuthContext.Provider value={{ ...state, login, logout, setToken }}>
            {props.children}
        </AuthContext.Provider>
    );
}
