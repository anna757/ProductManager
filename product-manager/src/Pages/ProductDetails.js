import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useProducts, useImageModal } from '../ProductContext';
import ImageModal from '../Components/ImageModal';
import { Typography, Container, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../Styles/ProductDetails.css'

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const { products } = useProducts();
    const { id } = useParams();
    const { setIsModalOpen} = useImageModal();

    useEffect(() => {
        const product = products.find(product => product.id === parseInt(id))
        setProduct(product);
    }, [id, products])

    const handleModalOpen = () => setIsModalOpen(true);

    return product ? (
        <Container className='product-details'>
            <Typography variant='h3'>{product.name}</Typography>
            <Typography variant='h5'>{product.type}</Typography>
            <Typography variant='h5'>${product.price}</Typography>
            <Box
                className='product-details--image'
                component='img'
                alt={product.alt}
                src={product.image}
                onClick={() => handleModalOpen()} 
            />
            <ImageModal 
                alt={product.alt}
                src={product.image}
            />
            <Box className='product-details--button-container'>
                <Button
                    id='product-details--edit'
                    className='product-details--button'
                    component={Link}
                    aria-label='edit'
                    to={`/products/${id}/edit`}>
                    <EditIcon sx={{ mr: 1 }} />
                    Edit Product Details
                </Button>
                <Button
                    id='product-details--back'
                    className='product-details--button'
                    aria-label='back'
                    component={Link}
                    to={`/products`}>
                    <ArrowBackIcon sx={{ mr: 1 }} />
                    Return to Products
                </Button>
            </Box>
        </Container>

    )
        : null
}

export default ProductDetails;