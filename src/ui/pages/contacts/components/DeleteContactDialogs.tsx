import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../../bll/hooks';
import {deletePackTC} from "../../../../bll/contactsReducer";
import {CustomizedDialogs} from "../../../common/components/CustomizedDialogs";

export function DeleteContactDialogs() {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const contactName = useAppSelector(state => state.contacts.contactName)
    const contactId = useAppSelector(state => state.contacts.contactId)
    let name
    contactName && (name = JSON.parse(contactName).name)
    return (
        <div>
            <CustomizedDialogs diologsName={'openDeleteContactDialogs'} title={'Delete contact'}>
                <Grid>
                    <Typography sx={{margin: '14px 0 30px 0'}}>
                        Do you really want to remove <b>{name && name.length > 14
                        ? `${name.substring(0, 10)}...`
                        : name}</b>?
                    </Typography>
                    <Button sx={{borderRadius: '30px', marginBottom: '30px'}}
                            type={'submit'}
                            disabled={status === 'loading'}
                            variant={'contained'}
                            color={'error'}
                            onClick={() => dispatch(deletePackTC(contactId))}
                            fullWidth>Delete</Button>
                </Grid>
            </CustomizedDialogs>
        </div>
    );
}
