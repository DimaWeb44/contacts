import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";
import {PATH} from "../Pages";
import {useAppDispatch, useAppSelector} from "../../../bll/hooks";
import {Article} from "./components/Article";
import {setAppOpenDiologsAC} from "../../../bll/appReducer";
import Button from "@mui/material/Button";
import {getContactsTC} from "../../../bll/contactsReducer";
import {CustomSearch} from "./components/CustomSearch";
import {Navigate} from "react-router-dom";
import {DeleteContactDialogs} from "./components/DeleteContactDialogs";
import {AddContactDialogs} from "./components/AddContactDialogs";
import {UpdateContactDialogs} from "./components/UpdateContactDialogs";
import {ContactType} from "../../../api/api";

export const Contacts = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const search = useAppSelector(state => state.search)
    const contacts = useAppSelector(state => state.contacts.contacts)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const contactsTotalCount = useAppSelector(state => state.contacts.contactsTotalCount)
    const onBtnAddPack = () => dispatch(setAppOpenDiologsAC('openAddContactDiologs'))

    useEffect(() => {
        dispatch(getContactsTC())
    }, [search])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (<Grid sx={{height: 'auto', margin: '0 70px', paddingBottom: '70px'}}>
        <Grid container
              direction="row"
              justifyContent="space-between"
              sx={{margin: '40px 0 30px 0'}}>
            <Typography gutterBottom variant="h4" component="div">
                My contacts
            </Typography>
            <Button disabled={status === 'loading'}
                    variant="contained"
                    sx={{borderRadius: '30px'}}
                    onClick={onBtnAddPack}
            >Add new contact</Button>
        </Grid>
        <Grid>
            <CustomSearch/>
        </Grid>
        <Grid container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start">
            {contactsTotalCount
                ? contacts.map((contact: ContactType) => <Article key={contact._id} contact={contact}/>)
                : <Typography margin={'70px auto'} variant="h4" component="div">
                    Contact not found
                </Typography>}
        </Grid>
        <DeleteContactDialogs/>
        <AddContactDialogs/>
        <UpdateContactDialogs/>
    </Grid>)
}