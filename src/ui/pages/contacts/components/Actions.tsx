import {Grid, IconButton} from "@mui/material"
import {setAppOpenDiologsAC} from "../../../../bll/appReducer"
import {useAppDispatch, useAppSelector} from "../../../../bll/hooks"
import {setContactNameIdAC} from "../../../../bll/contactsReducer"
import DeleteIcon from '@mui/icons-material/Delete'
import BorderColorIcon from '@mui/icons-material/BorderColor'

type ActionsPropsType = {
    id: string
    name: string
    cover: string
}

export const Actions = (props: ActionsPropsType) => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)

    const onBtnDeletePack = (packId: string, name: string) => {
        dispatch(setContactNameIdAC(packId, name))
        dispatch(setAppOpenDiologsAC('openDeleteContactDialogs'))
    }
    const onBtnUpdatePack = (packId: string, name: string, cover: string) => {
        dispatch(setContactNameIdAC(packId, name, cover))
        dispatch(setAppOpenDiologsAC('openUpdateContactDialogs'))
    }

    return <Grid>
        <IconButton
            disabled={status === 'loading'}
            onClick={() => {
                onBtnDeletePack(props.id, props.name)
            }}
            color="primary">
            <DeleteIcon fontSize="small"/>
        </IconButton>
        <IconButton
            disabled={status === 'loading'}
            onClick={() => {
                onBtnUpdatePack(props.id, props.name, props.cover)
            }}
            color="primary">
            <BorderColorIcon fontSize="small"/>
        </IconButton>
    </Grid>
}