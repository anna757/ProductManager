import { Button } from '@mui/material';
import React, { useContext } from 'react';
import { ProductContext } from '../ProductContext';

const PreviewButton = () => {
    const { isPreviewMode, togglePreviewMode } = useContext(ProductContext);
    return (
        <Button variant='outlined' 
            onClick={togglePreviewMode}
            className='preview-button'
            size='small'
        >
            {isPreviewMode ? 'Exit Preview' : 'Preview as Customer'}
        </Button>
    )
}

export default PreviewButton;