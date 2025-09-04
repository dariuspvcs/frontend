import { useAuthContext } from "./useAuthContext"
import { useWorkoutContext } from "./useWorkoutContext";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const {dispatch: pratimoDispatch} = useWorkoutContext();

    const logout = () => {
        localStorage.removeItem('user');

        dispatch({type: 'LOGOUT'});
        pratimoDispatch({type: 'SET_WORKOUTS', payload: null});
    }

    return {logout};
}