import {useState} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Avatar, Paper, Typography} from "@mui/material";
import {PATH} from "./Pages";
import {Navigate} from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useAppDispatch, useAppSelector} from "../../bll/hooks";
import {loginTC} from "../../bll/authReducer";
import {Form, Formik, FormikErrors} from 'formik'
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

const paperStyle = {padding: 30, height: '500px', width: 400, margin: '40px auto'}
const btStyle = {marginTop: '30px', borderRadius: '30px'}

interface FormValues {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword(!showPassword)

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    if (isLoggedIn) {
        return <Navigate to={PATH.CONTACTS}/>
    }

    return <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center">
                <Avatar style={{backgroundColor: '#1976d2', marginTop: '20px'}}><LockOutlinedIcon/></Avatar>
                <h2 style={{marginBottom: '0px'}}>Sign In</h2>
            </Grid>
            <Formik
                initialValues={{email: '', password: '', rememberMe: false}}
                validate={values => {
                    const errors: FormikErrors<FormValues> = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required'
                    } else if (values.password.length < 7) {
                        errors.password = 'Minimum password length of 7 characters'
                    }
                    return errors;
                }}
                onSubmit={(values, actions) => {
                    dispatch(loginTC(values))
                    actions.setSubmitting(false)
                    actions.resetForm()
                }}
            >
                {({values, getFieldProps, errors, touched}) => (
                    <Form>
                        <FormControl fullWidth>
                            <FormGroup>
                                <TextField error={touched.email && !!errors.email}
                                           variant="standard"
                                           label="Email"
                                           placeholder={'Enter email'}
                                           fullWidth
                                           required
                                           helperText={touched.email && errors.email ? errors.email : ''}
                                           sx={{
                                               marginBottom: '25px',
                                               '& .css-1d1r5q-MuiFormHelperText-root.Mui-error': {
                                                   position: "absolute",
                                                   top: '45px'
                                               },
                                           }}
                                           {...getFieldProps("email")} />
                                <TextField error={touched.password && !!errors.password}
                                           type={showPassword ? 'text' : 'password'}
                                           variant="standard"
                                           label="Password"
                                           placeholder={'Enter password'}
                                           fullWidth
                                           required
                                           helperText={touched.password && errors.password}
                                           sx={{
                                               marginBottom: '20px',
                                               '& .css-1d1r5q-MuiFormHelperText-root.Mui-error': {
                                                   position: "absolute",
                                                   top: '45px'
                                               },
                                           }}
                                           {...getFieldProps("password")}
                                           InputProps={{
                                               endAdornment: <IconButton
                                                   sx={{padding: '0px'}}
                                                   aria-label="toggle password visibility"
                                                   onClick={handleClickShowPassword}
                                                   edge="end"
                                               >
                                                   {showPassword ? <VisibilityOff/> : <Visibility/>}
                                               </IconButton>
                                           }}
                                />
                                <FormControlLabel label={'Remember me'}
                                                  control={<Checkbox {...getFieldProps("rememberMe")}
                                                                     checked={values.rememberMe}/>}/>
                                <Button type={'submit'}
                                        disabled={status === 'loading'}
                                        variant={'contained'}
                                        color={'primary'}
                                        style={btStyle}
                                        fullWidth>Sign In</Button>
                            </FormGroup>
                        </FormControl>
                    </Form>
                )}
            </Formik>
            <Grid container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{marginTop: '20px',}}>
                <Typography>
                    Email: <b>email@yandex.ru</b> <br/> Password: <b>12345678</b>
                </Typography>
            </Grid>
        </Paper>
    </Grid>
}