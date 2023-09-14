import { useSearch, useProducts } from '../ProductContext';
import { useNavigate } from 'react-router-dom'
import {
    Typography, Button, Box,
    TextField, InputAdornment, Select, MenuItem
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Renders a title and toolbar component
 * This component is above the product list
 * It includes a search bar and a button to add a new product
 * The button navigates to the add product page
 * The search can be done by category or name of a product
 */

const TitleAndToolbar = ({ title }) => {
    const navigate = useNavigate();
    const { search, setSearch } = useSearch();
    const { products, isPreviewMode, category, setCategory } = useProducts();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    }

    const categories = ['All', ...new Set(products.map(product => product.type))];


    return (
        <>
            <Typography
                variant='h3'
                className='product-list--title'>
                {title}
            </Typography>
            <Box className='product-list--toolbar'>
                <TextField
                    className='search'
                    label='Search'
                    variant='outlined'
                    placeholder='Search for a product'
                    value={search}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Select
                                    className='category-select'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    displayEmpty
                                    sx={{textAlign: 'center'}}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </Select>
                            </InputAdornment>
                        ),
                        style: { paddingRight: 0 } 
                    }}
                />
                {!isPreviewMode ? (
                    <Button
                        onClick={() => navigate(`/products/add`)}
                        className='product-list--add'
                        startIcon={<AddIcon />} >
                        Add Product
                    </Button>
                ) : (
                    <></>
                )}
            </Box>

        </>
    )
}

export default TitleAndToolbar;