import {Pages} from '../pages/Pages'
import {useEffect} from 'react'
import './App.css'
import {initializeAppTC} from "../../bll/appReducer";
import {useAppDispatch, useAppSelector} from "../../bll/hooks";
import {CircularProgress} from "@mui/material";
import {InfoSnackbar} from "../common/components/InfoSnackbar";
import {Header} from '../common/components/Header';

export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    return (<div className="App" style={{height: '100vh'}}>
            <InfoSnackbar/>
            <Header/>
            {!isInitialized
                ? <CircularProgress
                    sx={{
                        position: 'fixed',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)'
                    }}/>
                : <div className="wrapper"><Pages/></div>}
        </div>
    )
}
