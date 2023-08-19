import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Typography, Button, Box, FormControl, Avatar } from '@mui/material';
import '../Styles/ProductForm.css'

const DragAndDrop = ({ image, setImage, name, imageError }) => {
    const { getRootProps, isFocused, isDragAccept,
        isDragReject, open } = useDropzone({
            accept: 'image/*',
            maxFiles: 1,
            onDrop: (acceptedImage) => {
                setImage(URL.createObjectURL(acceptedImage[0]));
            },
            noClick: !image
        });

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
                        {...getRootProps(isFocused, isDragAccept, isDragReject)}
                        error={imageError}
                        helpertext={imageError}>
                        <Typography>Drag and drop or</Typography>
                        <Button
                            onClick={open}
                            variant='contained'
                            className='product-form--add-image'>
                            Insert Image
                        </Button>
                    </Box>
                    {imageError
                        ? <Typography color='error'>{imageError}</Typography>
                        : ''}
                </>
            )}
        </FormControl>
    );
};

export default DragAndDrop;
