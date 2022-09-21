import {Grid, InputBase, styled} from "@mui/material"
import {useAppDispatch, useAppSelector, useDebounce, useIsFirstRender} from "../../../../bll/hooks"
import {ChangeEvent, useEffect, useState} from "react"
import {setSearchNameAC} from "../../../../bll/searchReducer"
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(() => ({
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: 'white',
    marginLeft: '0px',
    borderRadius: '4px'
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    display: 'block',
    '& .MuiInputBase-input': {
        boxSizing: 'border-box',
        padding: theme.spacing(2.85, 2.85, 2.85, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        width: '100%',
    },
}))

export const CustomSearch = () => {
    const firstRender = useIsFirstRender()
    const dispatch = useAppDispatch()
    const search = useAppSelector(state => state.search)

    const [valueSearch, setValueSearch] = useState(search.searchName)
    const debouncedSearchTerm = useDebounce(valueSearch, 800)
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setValueSearch(e.target.value)
    }
    useEffect(() => {
        if (!firstRender) {
            dispatch(setSearchNameAC(debouncedSearchTerm as string))
        }
    }, [debouncedSearchTerm])

    return <Grid>
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeSearch(e)}
                value={valueSearch}
                sx={{ '& .MuiInputBase-input css-yz9k0d-MuiInputBase-input': { width: '100%' } }}
                placeholder="Search…"
            />
        </Search>
    </Grid>
}