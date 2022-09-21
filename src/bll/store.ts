import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AuthActionsType, authReducer} from "./authReducer";
import {ActionsTypeApp, appReducer} from "./appReducer";
import {ContactsActionsType, contactsReducer} from './contactsReducer';
import {SearchActionsType, searchReducer} from './searchReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    contacts: contactsReducer,
    search: searchReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppActionsType =
    | AuthActionsType
    | ActionsTypeApp
    | ContactsActionsType
    | SearchActionsType
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionsType>
