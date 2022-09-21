import React from 'react'
import {useDispatch} from 'react-redux'
import {setAppErrorAC, setAppInfoAC} from '../../../bll/appReducer'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from "@mui/material/Alert";
import {useAppSelector} from '../../../bll/hooks';

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

export function InfoSnackbar() {
    const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        info && dispatch(setAppInfoAC(null))
        error && dispatch(setAppErrorAC(null))
    };

    const error = useAppSelector(state => state.app.error);
    const info = useAppSelector(state => state.app.info);
    const isOpen = info != null || error != null

    const colorAlertInfo = info ? 'success' : undefined
    const colorAlertError = error ? 'error' :  undefined

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            <Alert  onClose={handleClose} severity={colorAlertInfo || colorAlertError} sx={{width: '100%'}}>
                {info}  {error}
            </Alert>
        </Snackbar>
    );
}