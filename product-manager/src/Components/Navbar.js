import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ProductContext } from '../ProductContext';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn, isPreviewMode, togglePreviewMode } = useContext(ProductContext);

    const handleLoginButton = () => {
        setIsLoggedIn(!isLoggedIn)
    }

    return (isLoggedIn) ? (
        <div>
            {!isPreviewMode ?
                <Button variant='contained'
                    onClick={handleLoginButton}
                    className='login-button'
                    size='small'
                >
                    {(isLoggedIn) ?
                        <>
                            <LogoutIcon sx={{ mr: 1 }} />
                            Logout
                        </>
                        : <>
                            <LoginIcon sx={{ mr: 1 }} />
                            Login
                        </>
                    }
                </Button >
                : <></>
            }

            <Button variant='contained'
                onClick={togglePreviewMode}
                className='preview-button'
                size='small'
            >
                {isPreviewMode ? 'Exit Preview' : 'Preview as a Customer'}
            </Button>
        </div >

    ) : <></>
}

export default Navbar