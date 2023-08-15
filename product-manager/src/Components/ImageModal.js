import { Modal, Box } from '@mui/material';
import { useImageModal } from '../ProductContext';
import '../Styles/ImageModal.css'

const ImageModal = ({alt, src}) => {
    const { isModalOpen, setIsModalOpen } = useImageModal()

    const handleModalClose = () => setIsModalOpen(false);

    return (
        <Modal
            className='modal'
            open={isModalOpen}
            onClose={handleModalClose}>
            <Box
                className='modal-image'
                component='img'
                alt={alt}
                src={src}
            />
        </Modal>
    )
}

export default ImageModal;