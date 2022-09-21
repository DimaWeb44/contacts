import React, {ChangeEvent, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import {Form, Formik} from 'formik';
import {Avatar, FormControl, FormGroup, Grid, IconButton, TextField} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {convertToBase64} from "../../../common/utils/convertToBase64";
import {updatePackTC} from "../../../../bll/contactsReducer";
import {CustomizedDialogs} from "../../../common/components/CustomizedDialogs";
import {PhotoCamera} from "@mui/icons-material";

export function UpdateContactDialogs() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const contacts = useAppSelector(state => state.contacts)
    const isOupenDiologs = useAppSelector(state => state.app.isOpenDiologs)

    let nameNumber = {name: '', number: ''}
    contacts.contactName && (nameNumber = JSON.parse(contacts.contactName))

    const [cover, setCover] = useState('')

    useEffect(() => {
        setCover('')
    }, [isOupenDiologs])

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file = target.files![0]
        const base64 = await convertToBase64(file)
        setCover(base64 as string)
    }

    return (
        <div>
            <CustomizedDialogs diologsName={'openUpdateContactDialogs'} title={'Edit contact'}>
                <Grid>
                    <Formik
                        initialValues={{title: nameNumber.name, number: nameNumber.number}}
                        onSubmit={(values, actions) => {
                            dispatch(updatePackTC(contacts.contactId, JSON.stringify({
                                    name: values.title,
                                    number: values.number
                                }),
                                cover))
                            actions.setSubmitting(false)
                            actions.resetForm()
                            setCover('')
                        }}
                    >
                        {({getFieldProps}) => (
                            <Form>
                                <FormControl fullWidth>
                                    <FormGroup>
                                        <Grid container justifyContent="center">
                                            <div style={{position: 'relative'}}>
                                                <Avatar variant="rounded" style={{backgroundColor: '#1976d2'}}
                                                        src={cover || contacts.contactCover as string}
                                                        sx={{width: 310, height: 210,}}/>
                                                <div style={{position: 'absolute', top: '175px', left: '275px'}}>
                                                    <Avatar sx={{width: 35, height: 35,}}>
                                                        <IconButton style={{color: 'white'}} aria-label="upload picture"
                                                                    component="label">
                                                            <input hidden accept="image/*" type="file"
                                                                   onChange={e => handleFileUpload(e)}/>
                                                            <PhotoCamera/>
                                                        </IconButton>
                                                    </Avatar>
                                                </div>
                                            </div>
                                        </Grid>
                                        <TextField variant="standard"
                                                   label="Contact"
                                                   placeholder={'Enter name'}
                                                   InputProps={{
                                                       inputProps: {
                                                           maxLength: 22, minLength: 1
                                                       }
                                                   }}
                                                   fullWidth
                                                   required
                                                   sx={{margin: '14px 0 10px 0'}}
                                                   helperText={'max text length 22'}
                                                   {...getFieldProps("title")} />
                                        <TextField type={"tel"}
                                                   variant="standard"
                                                   label="Number"
                                                   InputProps={{
                                                       inputProps: {
                                                           maxLength: 22, minLength: 1
                                                       }
                                                   }}
                                                   placeholder={'Enter number'}
                                                   fullWidth
                                                   required
                                                   helperText={'max text length 22'}
                                                   {...getFieldProps("number")} />
                                        <Button type={'submit'}
                                                disabled={status === 'loading'}
                                                variant={'contained'}
                                                color={'primary'}
                                                sx={{borderRadius: '30px', margin: '30px 0 30px 0'}}
                                        >Save</Button>
                                    </FormGroup>
                                </FormControl>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </CustomizedDialogs>
        </div>
    );
}
