import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, Box, FormControl, Avatar } from '@mui/material';
import '../Styles/ProductForm.css'

/**
 * Renders a drag and drop component for adding a new product image
 * We use the react dropzone package for rendering this component
 * It is referenced in the ProductForm.js page
 */
const DragAndDrop = ({ image, setImage, name, imageError }) => {
    const { getRootProps, getInputProps, isFocused, isDragAccept,
        isDragReject, open } = useDropzone({
            accept: {'image/*': []},
            maxFiles: 1,
            onDrop: (acceptedImage) => {
                setImage(URL.createObjectURL(acceptedImage[0]));
            },
            noClick: !image

        });

    // Styling classes based on the action
    // Blue when focused, Green when accepted, Red when rejected
    // The styles are applied in ProductForm.css
    const dropzoneClass = [
        'product-from--base-dropzone',
        isFocused ? 'product-from--focused-dropzone' : '',
        isDragAccept ? 'product-from--accept-dropzone' : '',
        isDragReject ? 'product-from--reject-dropzone' : ''
    ].join(' ');


    return (
        <FormControl className='product-from--input'>
            <Typography variant='body1' color={'#333'}>Image</Typography>
            {image ? (
                <Box
                    className='product-form--image-container'
                    {...getRootProps()} >
                    <Avatar
                        className='product-form--image'
                        variant='rounded'
                        src={image}
                        alt={name} />
                    <Typography className='product-form--image-text'>
                        Drag an image or click to select
                    </Typography>
                </Box>
            ) : (
                <>
                    <Box
                        className={dropzoneClass}
                        {...getRootProps(isFocused, isDragAccept, isDragReject)}>
                        <Typography>Drag and drop or</Typography>
                        <input {...getInputProps()} />
                        <Button
                            onClick={open}
                            variant='contained'
                            className='product-form--add-image'>
                            Insert Image
                        </Button>
                    </Box>
                    { /* Display error if attempting to submit without an image */
                        imageError
                        ? <Typography color='error'>{imageError}</Typography>
                        : ''}
                </>
            )}
        </FormControl>
    );
};

export default DragAndDrop;
