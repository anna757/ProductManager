import React from 'react';
import {
    Box, Typography, Button, Grid,
    Paper, Card, CardActionArea, CardMedia,
    CardContent, TextField, InputAdornment, IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useProducts } from '../ProductContext';
import { useNavigate } from 'react-router-dom';
import '../Styles/HomePage.css';

const heroID = 100;
const categoriesConfig = [
    { label: "Realistic Images", id: 84, text: 'High-quality realistic images' },
    { label: "Digital Art", id: 101, text: 'Stunning digital art collections' },
    { label: "Patterns", id: 49, text: 'Unique pattern designs' }
];

const HomePage = () => {
    const { products, search, setSearch } = useProducts();
    const navigate = useNavigate();

    const heroProduct = products.find(product => product.id === heroID);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate('/products')
    }

    return (
        <Box className='homepage-container'>
            {/* Hero Section */}
            <Box className='hero-section' style={{ backgroundImage: `url(${heroProduct?.image || ""})` }}>
                <Box className='hero-content'>
                    <Typography variant='h3' className='hero-title'>
                        Welcome
                    </Typography>
                    <Typography variant='h4' className='hero-subtitle'>
                        Explore our wide range of images
                    </Typography>
                    <form onSubmit={handleSearchSubmit}>
                        <TextField
                            className='search-container rounded-search'
                            value={search}
                            variant='outlined'
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search for images...'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            className='search-icon'
                                            onClick={handleSearchSubmit}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                </Box>
            </Box>

            {/* Categories Section */}
            <Box component='div' className='category-section'>
                <Typography variant='h4' gutterBottom>
                    Categories
                </Typography>
                <Grid container spacing={4}>
                    {categoriesConfig.map(category => {
                        const product = products.find(p => p.id === category.id) || {};
                        return (
                            <Grid item key={category.label} xs={12} sm={6} md={4}>
                                <Card elevation={3} variant="outlined">
                                    <CardActionArea>
                                        <CardMedia
                                            component='img'
                                            alt={product.alt || "Placeholder alt"}
                                            height="250"
                                            image={product.image || "Placeholder image URL"}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant='h5'>
                                                {category.label}
                                            </Typography>
                                            <Typography variant='body2' color="textSecondary">
                                                {category.text}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
}

export default HomePage;
