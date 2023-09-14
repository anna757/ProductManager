import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import { useProducts, useImageModal } from '../ProductContext';
import ImageModal from '../Components/ImageModal';
import { Typography, Container, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import '../Styles/ProductDetails.css'

/**
 * Renders a product details component
 * Shows the product name, price, category and image
 * Image can be clicked to show a bigger modal
 */
const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const { products, isPreviewMode } = useProducts();
    const { id } = useParams();
    const { setIsModalOpen } = useImageModal();

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
                    to={!isPreviewMode ? `/products/${id}/edit` : ''}>

                    {!isPreviewMode ? (
                        <>
                            <EditIcon sx={{ mr: 1 }} />
                            Edit Product Details
                        </>
                    ) : (
                        <>
                            <AddShoppingCartIcon sx={{ mr: 1}} />
                            Add product to cart
                        </>
                    )}
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