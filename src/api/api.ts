import axios from "axios"

export const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginResponseType>(`auth/login`, data).then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/me`).then(res => res.data)
    },
    me() {
        return instance.post<LoginResponseType>(`auth/me`, {}).then(res => res.data)
    }
}

export const contactAPI = {
    getContacts(
        searchName?: string,
        userId?: string) {
        return instance.get<GetContactsResponseType>(`cards/pack?pageCount=1000&`
            + (searchName ? `packName=${searchName}&` : '')
            + (userId ? `user_id=${userId}&` : '')).then(res => res.data)
    },
    addContact(name?: string, cover?: string) {
        return instance.post(`cards/pack`, {
            cardsPack:
                {name, deckCover: cover, private: true}
        })
    },
    deleteContact(packId: string) {
        return instance.delete(`cards/pack?id=${packId}`)
    },
    updateContact(packId: string, name?: string, cover?: string) {
        return instance.put(`cards/pack`, {cardsPack: {_id: packId, name, private: true, deckCover: cover}})
    }
}

// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}

export type LoginResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string | undefined;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type ResponseType = {
    info: string
    error?: string
}

export type GetContactsResponseType = {
    cardPacks: Array<ContactType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type ContactType = {
    cardsCount: number
    deckCover: string
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}
