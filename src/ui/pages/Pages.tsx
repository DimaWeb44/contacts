import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from "./Login";
import {Contacts} from './contacts/Contacts'

export const PATH = {
    LOGIN: '/login',
    CONTACTS: '/contacts',
}

export const Pages = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.CONTACTS} element={<Contacts/>}/>
                <Route path={'/*'} element={<h1>Error 404</h1>}/>
            </Routes>
        </div>
    )
}