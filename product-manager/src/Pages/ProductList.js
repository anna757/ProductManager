import { useNavigate } from 'react-router-dom'
import { useProducts, useSearch, usePagination } from '../ProductContext';
import ProductListPagination from '../Components/ProductListPagination'
import TitleAndToolbar  from '../Components/TitileAndToolbar';

// MUI and MUI Icon imports
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Box, Table, TableBody, TableHead, TableCell, TableRow,
    Paper, Typography, Avatar, TableContainer, IconButton
} from '@mui/material'

import '../Styles/ProductList.css'


const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'price', label: 'Price' },
    { id: 'type', label: 'Category' },
    { id: 'src', label: 'Image', align: 'center' },
    { id: 'actions', label: 'Actions', align: 'center' }
]

const ProductList = () => {
    const { products, deleteProduct } = useProducts();
    const { page, rowsPerPage } = usePagination();
    const { search } = useSearch();
    const navigate = useNavigate()

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
                        <TableHead>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}>
                                        <Typography sx={{ py: 1, fontWeight: 'bold' }}
                                            className='product-list--label'
                                            variant='h6'>
                                            {column.label}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
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
                                                    src={product.src}
                                                    className='product-list--image' />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    className='product-list--view'
                                                    aria-label='open'
                                                    onClick={() => navigate(`/products/${product.id}`)}>
                                                    <OpenInNewIcon className='product-list--icon' />
                                                </IconButton>
                                                <IconButton
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
                    <ProductListPagination products={products} />
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default ProductList;