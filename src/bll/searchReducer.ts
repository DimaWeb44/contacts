import {AppActionsType} from "./store";

const initialState: InitialStateType = {
    searchName:  '',
}

export const searchReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case'search/SET-SEARCH-NAME':
            return {...state, searchName: action.searchName}
        default:
            return state
    }
}

// actions
export const setSearchNameAC = (searchName: string) => ({type: 'search/SET-SEARCH-NAME', searchName} as const)

// types
export type SearchActionsType =  ReturnType<typeof setSearchNameAC>
type InitialStateType = {
    searchName: string |  undefined
}

