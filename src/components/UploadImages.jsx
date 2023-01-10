import { useCallback } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useDropzone } from 'react-dropzone'
import useUploadImages from '../hooks/useUploadImages'

const UploadImages = () => {

    const uploadImages = useUploadImages()

    const onDrop = useCallback((acceptedFiles) => {

        if (!acceptedFiles.length) {
            return
        }

        acceptedFiles.forEach((photo) => {
            uploadImages.upload(photo)
        });

    }, [])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
        },
        maxFiles: 5,
        onDrop,
    })

    return (
        <>
            <div {...getRootProps()} id="dropzone-wrapper">
                <input {...getInputProps()} />

                <div>
                    <span>Click here to upload your photos or drag and drop them here <br /> (maximum 5 files at the same time)</span>
                </div>

            </div>

            {uploadImages.isError && <Alert variant='danger'>{uploadImages.error.message}</Alert>}

        </>
    )
}

export default UploadImages