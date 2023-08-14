import React, { useState } from "react";
import products from '../data/products.json'
import { useNavigate } from 'react-router-dom'
import {
    Box, Table, TableBody, TableHead, TableCell, TablePagination,
    TableRow, Paper, Typography, Avatar, TableContainer, IconButton,
    InputAdornment, TextField, Button
} from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import '../Styles/ProductList.css'
const columns = [
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'price', label: 'Price' },
    { id: 'type', label: 'Category' },
    { id: 'src', label: 'Image', align: 'center' },
    { id: 'actions', label: 'Actions', align: 'center' }
]
const ProductList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
        || product.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box component="div" className="product-list">
            <Typography variant="h3" className="product-list--title">Product List</Typography>
            <Box className="product-list--toolbar">
                <TextField
                    className="search"
                    label="Search"
                    variant="outlined"
                    placeholder="Search by name or category"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    className="product-list--add"
                    startIcon={<AddIcon />} >
                    Add Product
                </Button>
            </Box>
            <Paper elevation="3" className="product-list--table">
                <TableContainer className="product-list--tcontainer">
                    <Table>
                        <TableHead>
                            <TableRow >
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}>
                                        <Typography sx={{ py: 1, fontWeight: 'bold' }}
                                            className="product-list--label"
                                            variant="h5">
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
                                                    variant="rounded"
                                                    alt={product.alt}
                                                    src={product.src}
                                                    className='product-list--image' />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    className="product-list--view"
                                                    aria-label="open"
                                                    onClick={() => navigate(`/products/${product.id}`)}>
                                                    <OpenInNewIcon className="product-list--icon" />
                                                </IconButton>
                                                <IconButton
                                                    className="product-list--delete"
                                                    aria-label="delete">
                                                    <DeleteIcon className="product-list--icon" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={products.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        width={'inherit'}
                    />
                </TableContainer>
            </Paper>
        </Box>
    );
}

export default ProductList;