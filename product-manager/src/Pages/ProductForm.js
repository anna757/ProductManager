import React, { useEffect } from 'react';
import { useForm, useProducts } from '../ProductContext';
import { useParams, useNavigate } from 'react-router-dom';
import DragAndDrop from '../Components/DragAndDrop';
import {
    Box, Paper, TextField, Typography, FormControl,
    Select, InputLabel, MenuItem, Button
} from '@mui/material'
import '../Styles/ProductForm.css'

/**
 * Renders a product form to add or edit products
 */
const ProductForm = () => {
    const { id } = useParams();
    // import form states and product states from context
    const { name, setName, nameError, setNameError,
        price, setPrice, priceError, setPriceError,
        image, setImage, imageError, setImageError,
        type, setType, resetForm } = useForm();
    const { products, setProducts, addProduct } = useProducts();
    const navigate = useNavigate();

    // useEffect to keep the products updated
    useEffect(() => {
        if (id) {
            const product = products.find(product => product.id === parseInt(id));
            if (product) {
                setName(product.name);
                setPrice(product.price);
                setType(product.type);
                setImage(product.image);
            }
        }
        else resetForm();
    }, [id, products]);

    const handleSubmit = (e) => {
        // implement validation
        e.preventDefault();
        if (!name) {
            setNameError('Name is Required');
            return;
        }
        if (price <= 0) {
            setPriceError('Price must be greater than 0');
            return;
        }
        if (!image) {
            setImageError('Please insert an image');
            return;
        }
        // Updated the edited products
        if (id) {
            const editedProducts = products.map(product => {
                console.log(product);
                return product.id === parseInt(id)
                    ? { ...product, name, price, type, image }
                    : product;
            })
            setProducts(editedProducts);
        }
        // Otherwise add a new product
        else addProduct(name, price, type, image);
        // Navigate to the product list when done
        navigate('/products');
    }
    return (
        <Box className='product-from'>
            <Typography
                variant='h3'
                className='product-form--title'>
                {id ? 'Edit' : 'Add'} Product
            </Typography>
            <Paper
                className='product-from--form'
                component='form'
                onSubmit={handleSubmit}>
                <FormControl>
                    <TextField
                        className='product-from--input'
                        label='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Enter product name'
                        autoFocus
                        required
                        error={nameError !== ''}
                        helperText={nameError}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                        className='product-from--input'
                        label='Price'
                        value={price}
                        type='number'
                        onChange={e => setPrice(e.target.value)}
                        placeholder='Enter product price'
                        required
                        InputProps={{ startAdornment: '$' }}
                        error={priceError !== ''}
                        helperText={priceError}
                    />

                </FormControl>
                <FormControl className='product-from--input'>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        label='Category' >
                        <MenuItem value={'Digital Art'}>
                            Digital Art
                        </MenuItem>
                        <MenuItem value={'Realistic Photos'}>
                            Realistic Photo
                        </MenuItem>
                        <MenuItem value={'Pattern'}>
                            Pattern
                        </MenuItem>
                    </Select>
                </FormControl>
                <DragAndDrop
                    image={image}
                    setImage={setImage}
                    name={name}
                    imageError={imageError} />
                <Button
                    type='submit'
                    variant='contained'
                    className='product-form--submit'
                    onClick={handleSubmit}>
                    {id ? 'Update' : 'Add'} Product
                </Button>
            </Paper>
        </Box>
    );
}

export default ProductForm;