import {AxiosError} from 'axios';
import {contactAPI, ContactType} from "../api/api";
import {AppActionsType, AppDispatchType, RootStateType} from "./store";
import {errorTC, setAppOpenDiologsAC, setAppStatusAC} from "./appReducer";

const initialState: InitialStateType = {
    contacts: [] as Array<ContactType>,
    contactsTotalCount: 1,
    contactId: '',
    contactName: '',
    contactCover: ''
}

export const contactsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'contacts/SET-CONTACTS':
            return {
                ...state,
                contacts: action.contacts,
                contactsTotalCount: action.contactsTotalCount,
            }
        case 'contacts/SET-CONTACT-ID-NAME':
            return {
                ...state,
                contactId: action.id,
                contactName: action.name,
                contactCover: action.cover
            }
        default:
            return state
    }
}

// actions
export const setContactsAC = (contacts: Array<ContactType>, contactsTotalCount: number) => ({
    type: 'contacts/SET-CONTACTS',
    contacts,
    contactsTotalCount
} as const)
export const setContactNameIdAC = (id: string, name: string, cover?: string) => ({
    type: 'contacts/SET-CONTACT-ID-NAME',
    id,
    name,
    cover
} as const)

export type GetStore = () => RootStateType

// thunks
export const getContactsTC = () => (dispatch: AppDispatchType, getStore: GetStore) => {
    dispatch(setAppStatusAC('loading'))
    const searchName = getStore().search.searchName
    const profileID = getStore().auth.user._id
    contactAPI.getContacts(searchName, profileID)
        .then(res => {
            dispatch(setContactsAC(res.cardPacks, res.cardPacksTotalCount))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const addContactTC = (name?: string, cover?: string) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppOpenDiologsAC('close'))
    contactAPI.addContact(name, cover)
        .then(() => {
            dispatch(getContactsTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const deletePackTC = (packId: string) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppOpenDiologsAC('close'))
    contactAPI.deleteContact(packId)
        .then(() => {
            dispatch(getContactsTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

export const updatePackTC = (packId: string, name?: string, cover?: string) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppOpenDiologsAC('close'))
    contactAPI.updateContact(packId, name, cover)
        .then(() => {
            dispatch(getContactsTC())
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e: AxiosError<{ error: string }>) => {
            dispatch(errorTC(e))
        })
}

// types
export type ContactsActionsType = ReturnType<typeof setContactsAC> | ReturnType<typeof setContactNameIdAC>
type InitialStateType = {
    contacts: Array<ContactType>,
    contactsTotalCount: number
    contactId: string
    contactName: string,
    contactCover?: string
}

