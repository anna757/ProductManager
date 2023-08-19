import React, { useState } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material'
import '../Styles/Login.css'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'adminPW') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/products';
        }
        else {
            setError('Wrong username or password!');
        }
    }

    return (
        <Box className='login' component='main'>
            <Box className='login--container'
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    width: 350,
                    p: 5,
                    borderRadius: 5
                }} >
                <Typography
                    sx={{ color: '#333', mb: 2 }}
                    variant='h5'
                    align='center'>Sign in to Product Manager
                </Typography>
                <TextField className='login--input'
                    label='username'
                    variant='standard'
                    required
                    fullWidth
                    autoFocus
                    InputProps={{ disableUnderline: true }}
                    error={errorMessage !== ''}
                    onChange={(e) => setUsername(e.target.value)} />
                <TextField className='login--input'
                    label='password'
                    type='password'
                    variant='standard'
                    required
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    error={errorMessage !== ''}
                    helperText = {errorMessage}
                    onChange={(e) => setPassword(e.target.value)} />
                <Button className='login--submit'
                    sx={{ mt: 3, py: 1.5, px: 2 }}
                    align='center'
                    type='submit'
                    variant='standard'
                    color='primary'>
                    Sign in
                </Button>
            </Box>
        </Box>
    );
}

export default Login;