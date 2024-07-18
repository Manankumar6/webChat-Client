const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
            case "GET_USER":
                return{
                    ...state,
                    user:action.payload,
                    isAuth:true
                }
        case 'SET_USER_LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuth:true
            };
            case "HANDLE_INPUT":
                console.log(action.payload.name)
                const { name, value } = action.payload
                return {

                    ...state,
                    userData: {
                        ...state.userData,
                        [name]: value
                    },
                };
                case "LOGOUT_USER":
                    return{
                        ...state,
                        isLoading:false,
                        isAuth:false
                    }
        default:
            return state;
    }
}

export default AuthReducer