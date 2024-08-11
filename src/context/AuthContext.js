import React, { createContext, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducer/reducer'
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const initialState = {
        isLoading: false,
        isAuth: false,
        userData: {

            fullname: '',
            username: '',
            password: '',
        },
        user: '',
        allUsers: []
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleInput = (e) => {
        const { name, value } = e.target;
        dispatch({ type: "HANDLE_INPUT", payload: { name, value } });
    };


    const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_BASE_URL || 
        'http://localhost:5000/api/auth',
        headers: { "Content-Type": "application/json" }, // Set default headers
        withCredentials: true, // Include credentials by default
        credentials: 'include', // Specify credentials to include
    });

    const checkAuth = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await axiosInstance.get('/check');

            if (response.data) {
                navigate('/webchat')
            }
            dispatch({ type: 'GET_USER', payload: response.data.user });
        } catch (error) {
            console.error('Error checking authentication:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const signUp = async (fullName, userName, password) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const { data } = await axiosInstance.post('/signup', { fullName, userName, password });
            if (data) {

                dispatch({ type: 'GET_USER', payload: data.user });
                navigate('/webchat')
            }
        } catch (error) {
            console.error('Error signing up:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const logIn = async (userName, password) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const { data } = await axiosInstance.post('/login', { userName, password });



            if (data) {
                dispatch({ type: 'SET_USER_LOGIN', payload: data.user });
                navigate('/webchat')
            }
        } catch (error) {
            console.error('Error logging in:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const logOut = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            await axiosInstance.post('/logout');
            dispatch({ type: 'LOGOUT_USER' });
            navigate('/')
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };


    const getAllUsers = async () => {
        try {

            dispatch({ type: 'SET_LOADING', payload: true });
            const { data } = await axiosInstance.get("/getallusers")
            console.log(data)
            if (data.success) {
                dispatch({ type: "GET_ALL_USERS", payload: data.users })
            }
        } catch (error) {
            console.log(error)
        }
    }


    const addFriend = async (friendId)=>{
        console.log(friendId,"from context ")
        const {data} = await axiosInstance.post(`/add-friend/${friendId}`)
        console.log(data)

    }
    useEffect(() => {
        checkAuth();
        getAllUsers()
        // eslint-disable-next-line
    }, [state.isAuth]);

    return (
        <AuthContext.Provider value={{ ...state, handleInput, signUp, logIn, logOut,addFriend }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuthContext = () => {
    return useContext(AuthContext);
};


export { useAuthContext, AuthProvider };
