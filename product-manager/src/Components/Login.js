import React, { useState } from "react";
import { Button, Typography, TextField, Box, Container } from '@mui/material'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setError] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username,password);
        if (username === 'admin' && password === 'adminPW') {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/products';
        }
        else {
            setError('Wrong username or password!');
        }
    }
    return (
        <Container
            component="main"
            maxWidth="xs" >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: 350,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'center',
                    mt: 20,
                    p: 5,
                    border: "1px solid",
                    borderRadius: 3
                }}>
                <Typography variant="h5" align="center">Sign in to NeuraCanvas</Typography>
                <TextField
                    sx={{ mt: 3, pt: 1 }}
                    label="username"
                    variant="standard"
                    required
                    fullWidth
                    autoFocus
                    error={errorMessage !== ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    sx={{ mt: 3, pt: 1}}
                    label="password"
                    variant="standard"
                    required
                    fullWidth
                    error={errorMessage !== ''}
                    onChange={(e) => setPassword(e.target.value)} />
                {errorMessage !== '' ?
                 <Typography sx={{mt: 2}}variant=" subtitle1" color="error"> {errorMessage}</Typography>: <></>}
                <Button
                    sx={{ mt: 3, py: 1.5, px: 2}}
                    align="center"
                    type="submit"
                    variant="standard"
                    color="blue">
                    Sign in
                </Button>
            </Box>
        </Container>
    );
}

export default Login;