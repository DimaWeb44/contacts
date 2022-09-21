import {AxiosError} from 'axios';
import {authAPI, LoginParamsType, LoginResponseType} from "../api/api";
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";
import {errorTC, setAppInfoAC, setAppStatusAC} from "./appReducer";

const initialState: InitialStateType = {
    isLoggedIn: false,
    user: {} as LoginResponseType
}

export const authReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-USER-DATA':
            return {...state, user: action.data}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setUserDataAC = (data: LoginResponseType) =>
    ({type: 'login/SET-USER-DATA', data} as const)

// thunks
export const loginTC = (data: LoginParamsType): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            dispatch(setUserDataAC(res))
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const logoutTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
                res.info && dispatch(setAppInfoAC(res.info))
            }
        )
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setUserDataAC>
type InitialStateType = {
    isLoggedIn: boolean
    user: LoginResponseType
}

