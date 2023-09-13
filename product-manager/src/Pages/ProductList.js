import { useNavigate } from 'react-router-dom';
import { useProducts, useSearch, usePagination } from '../ProductContext';
import ProductListPagination from '../Components/ProductListPagination';

// Custom Components
import TitleAndToolbar from '../Components/TitileAndToolbar';
import EnhancedTableHead from '../Components/EnhancedTableHead';

// MUI and MUI Icon imports
import {
    Box, Table, TableBody, TableCell, TableRow,
    Paper, Avatar, TableContainer, IconButton, ImageList,
    Card, CardMedia, CardContent, Typography, ImageListItem,
    Button, CardActions
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// Styles
import '../Styles/ProductList.css'

/**
 * Renders a table that displays all the products. 
 * Has a name, price, category, image.
 * Also actions to view product detail page, edit, or delete product
 * Can be ordered by name, price, category.
 * Pagination of 10/25/100 products per page
 */

// The columns to be displayed
const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'price', label: 'Price' },
    { id: 'type', label: 'Category' },
    { id: 'image', label: 'Image', align: 'center' },
    { id: 'actions', label: 'Actions', align: 'center' }
]

// The product list component
const ProductList = () => {
    const { products, deleteProduct,
        isPreviewMode, category, resetForm } = useProducts();
    const { page, rowsPerPage } = usePagination();
    const { search } = useSearch();
    const navigate = useNavigate();

    // Filtered products for the search function
    const filteredProducts = products.filter(product =>
        (category === 'All' || product.type === category) &&
        (product.name.toLowerCase().includes(search.toLowerCase())
            || product.type.toLowerCase().includes(search.toLowerCase()))
    );


    return (
        isPreviewMode ? (
            <Box component='div' className='product-list-preview'>
                < TitleAndToolbar />
                <ImageList variant='masonry'
                    direction='column'
                    sx={{
                        columnCount: {
                            xs: '1 !important',
                            sm: '2 !important',
                            md: '3 !important',
                            lg: '4 !important',
                            xl: '5 !important',
                        }
                    }}
                    gap={8}>
                    {filteredProducts.map((product) => {
                        return (
                            <ImageListItem key={product.id}>
                                <Card className='product-list-preview-card'>
                                    <CardMedia
                                        sx={{ cursor: 'pointer' }}
                                        component='img'
                                        alt={product.alt}
                                        image={product.image}
                                        onClick={() => navigate(`/products/${product.id}`)}
                                    />
                                    <CardContent>
                                        <Typography variant='h5'>
                                            {product.name}
                                        </Typography>
                                        <Typography variant='h6'>
                                            {product.type}
                                        </Typography>
                                        <Typography variant='h6'>
                                            ${product.price}
                                        </Typography>
                                    </CardContent>
                                    <CardActions className='product-list-preview-actions'>
                                        <Button
                                            className='product-list--preview-button'
                                            variant='contained'
                                            color='success'
                                            onClick={() => navigate(`/products/${product.id}`)}
                                            ><OpenInNewIcon sx={{pr: 1}}/>
                                            View Details
                                        </Button>
                                        <Button
                                            className='product-list--preview-button'
                                            variant='contained'
                                        ><AddShoppingCartIcon sx={{pr: 1}}/>
                                            Add to Cart
                                        </Button>
                                    </CardActions>

                                </Card>
                            </ImageListItem>
                        )
                    })}
                </ImageList>
            </Box>
        ) : (
            <Box component='div' className='product-list'>
                {/* Title and toolbar component */}
                < TitleAndToolbar title='Your Products' />
                <Paper elevation={3} className='product-list--table'>
                    <TableContainer className='product-list--tcontainer'>
                        <Table>
                            {/* Enhanced Table head component */}
                            <EnhancedTableHead
                                columns={columns}
                                products={filteredProducts}>
                            </EnhancedTableHead>
                            <TableBody sx={{ p: 15, width: '100%' }}>
                                {filteredProducts
                                    .slice(page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage)
                                    .map((product) => {
                                        return (
                                            <TableRow hover key={product.id}>
                                                <TableCell>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell>
                                                    ${product.price}
                                                </TableCell>
                                                <TableCell>
                                                    {product.type}
                                                </TableCell>
                                                <TableCell>
                                                    <Avatar
                                                        variant='rounded'
                                                        alt={product.alt}
                                                        src={product.image}
                                                        className='product-list--image'
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        size='small'
                                                        sx={{ mr: 1 }}
                                                        className='product-list--view'
                                                        aria-label='open'
                                                        onClick={() => navigate(`/products/${product.id}`)}>
                                                        <OpenInNewIcon className='product-list--icon' />
                                                    </IconButton>
                                                    <IconButton
                                                        size='small'
                                                        sx={{ mr: 1 }}
                                                        onClick={() => {
                                                            resetForm();
                                                            navigate(`/products/${product.id}/edit`);
                                                        }}
                                                        className='product-list--edit'
                                                        aria-label='edit'>
                                                        <EditIcon className='product-list--icon' />
                                                    </IconButton>
                                                    <IconButton
                                                        size='small'
                                                        onClick={() => deleteProduct(product.id)}
                                                        className='product-list--delete'
                                                        aria-label='delete'>
                                                        <DeleteIcon className='product-list--icon' />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                        <ProductListPagination products={filteredProducts} />
                    </TableContainer>
                </Paper>
            </Box >
        )
    );
}

export default ProductList;