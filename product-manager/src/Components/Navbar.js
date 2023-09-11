import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ProductContext } from '../ProductContext';

const Navbar = () => {
    const { isLoggedIn, isPreviewMode, togglePreviewMode } = useContext(ProductContext);
    return (
        <div>
            <Button variant='outlined'
                onClick={togglePreviewMode}
                className='preview-button'
                size='small'
            >
                {isPreviewMode ? 'Exit Preview' : 'Preview as Customer'}
            </Button>
            <Button variant='outlined'
                onClick={togglePreviewMode}
                className='preview-button'
                size='small'
            >
                {isPreviewMode ? 'Exit Preview' : 'Preview as Customer'}
            </Button>
        </div>

    )
}

export default Navbar