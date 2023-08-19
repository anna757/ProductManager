import React, { useEffect } from 'react';
import { useForm, useProducts, useValidation } from '../ProductContext';
import { useParams, useNavigate } from 'react-router-dom';
import DragAndDrop from '../Components/DragAndDrop';
import {
    Box, Paper, TextField, Typography, FormControl,
    Select, InputLabel, MenuItem, Button
} from '@mui/material'
import '../Styles/ProductForm.css'

const ProductForm = () => {
    const { id } = useParams();
    const { name, setName, price, setPrice,
        type, setType, image, setImage,
        resetForm } = useForm();
    const {nameError, setNameError,
        priceError, setPriceError,
        imageError, setImageError} = useValidation();
    const { products, setProducts, addProduct } = useProducts();
    const navigate = useNavigate();

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
        else resetForm()
    }, [id, products]);

    const handleSubmit = (e) => {
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
            
        if (id) {
            const editedProducts = products.map(product => {
                console.log(image)
                return product.id === parseInt(id) 
                ? {...product, name, price, type, image} 
                : product;
            })
            setProducts(editedProducts);
        }
        else addProduct(name, price, type, image);
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
                        autoWidth
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
                        autoWidth
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
                        autoWidth
                        label='Category'
                    >
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
                <DragAndDrop image={image} setImage={setImage} name={name} imageError={imageError} />
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