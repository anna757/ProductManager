import { useNavigate } from 'react-router-dom'
import { useProducts, useSearch, usePagination } from '../ProductContext';
import ProductListPagination from '../Components/ProductListPagination'
import TitleAndToolbar from '../Components/TitileAndToolbar';
import EnhancedTableHead from '../Components/EnhancedTableHead';
// MUI and MUI Icon imports
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {
    Box, Table, TableBody, TableCell, TableRow,
    Paper, Avatar, TableContainer, IconButton
} from '@mui/material'

// Styles
import '../Styles/ProductList.css'

const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'price', label: 'Price' },
    { id: 'type', label: 'Category' },
    { id: 'image', label: 'Image', align: 'center' },
    { id: 'actions', label: 'Actions', align: 'center' }
]

const ProductList = () => {
    const { products, deleteProduct } = useProducts();
    const { page, rowsPerPage } = usePagination();
    const { search } = useSearch();
    const navigate = useNavigate();


    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
        || product.type.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box component='div' className='product-list'>
            <TitleAndToolbar />
            <Paper elevation={3} className='product-list--table'>
                <TableContainer className='product-list--tcontainer'>
                    <Table>
                        <EnhancedTableHead
                            columns={columns}
                            products={filteredProducts}></EnhancedTableHead>
                        <TableBody sx={{ p: 15, width: '100%' }}>
                            {filteredProducts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                                    onClick={() => navigate(`/products/${product.id}/edit`)}
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
        </Box>
    );
}

export default ProductList;