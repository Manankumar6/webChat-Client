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
                    isAuth:true,

                }
        case 'SET_USER_LOGIN':
            return {
                ...state,
                user: action.payload,
                isAuth:true,
              
            };
            case "HANDLE_INPUT":
           
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
                        isAuth:false,
                      
                    }
            case "GET_ALL_USERS":
                return{

                    ...state,
                    isLoading:false,
                    allUsers:action.payload
                    
                }
                case "GET_ALL_FRIENDS":
                    return{
                        ...state,
                        friends:action.payload,
                        isLoading:false
                    }
        default:
            return state;
    }
}

export default AuthReducer