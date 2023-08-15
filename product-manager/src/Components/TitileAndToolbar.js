import { Typography, Button, Box, TextField, InputAdornment } from '@mui/material'
import { useSearch } from '../ProductContext';
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';



const TitleAndToolbar = () => {
    const navigate = useNavigate();
    const { search, setSearch } = useSearch();
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <>
            <Typography
                variant='h3'
                className='product-list--title'>
                Your Products
            </Typography>
            <Box className='product-list--toolbar'>
                <TextField
                    className='search'
                    label='Search'
                    variant='outlined'
                    placeholder='Search by name or category'
                    value={search}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    onClick={() => navigate(`/products/add`)}
                    className='product-list--add'
                    startIcon={<AddIcon />} >
                    Add Product
                </Button>
            </Box>
        </>
    )
}

export default TitleAndToolbar;