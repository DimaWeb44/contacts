import {authAPI} from '../api/api'
import {setIsLoggedInAC, setUserDataAC} from './authReducer'
import {AppActionsType, AppDispatchType, AppThunkType} from "./store";
import {errorMessage} from '../ui/common/utils/errorMessage';
import {AxiosError} from 'axios';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    info: null,
    isInitialized: false,
    isOpenDiologs: 'close',
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INFO':
            return {...state, info: action.info}
        case 'APP/SET-IS-INITIALIED':
            return {...state, isInitialized: action.value}
        case 'APP/SET-IS-DIOLOGS':
            return {...state, isOpenDiologs: action.diologs}
        default:
            return {...state}
    }
}

// actions
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInfoAC = (info: string | null) => ({type: 'APP/SET-INFO', info} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIED', value} as const)
export const setAppOpenDiologsAC = (diologs: string) => ({type: 'APP/SET-IS-DIOLOGS', diologs} as const)

// thunks
export const initializeAppTC = (): AppThunkType => (dispatch: AppDispatchType) => {
    authAPI.me()
        .then(res => {
            if (res.name) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setUserDataAC(res))
            }
        })
        .catch((e) => {
            if (e.response.status !== 401) dispatch(setAppErrorAC(errorMessage(e)))
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true))
        })
}

export const errorTC = (e: AxiosError<{ error: string }>): AppThunkType => (dispatch: AppDispatchType) => {
    dispatch(setAppErrorAC(errorMessage(e)))
    dispatch(setAppStatusAC('failed'))
}

// types
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    info: string | null
    isInitialized: boolean,
    isOpenDiologs: string
}
export type RequestStatusType = 'idle' | 'loading'  | 'succeeded' | 'failed'
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppInfoActionType = ReturnType<typeof setAppInfoAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppOpenDiologsActionType = ReturnType<typeof setAppOpenDiologsAC>
export type ActionsTypeApp =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppInfoActionType
    | SetAppOpenDiologsActionType
    | ReturnType<typeof setAppInitializedAC>

