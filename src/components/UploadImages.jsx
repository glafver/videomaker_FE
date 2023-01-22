import { useCallback, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useDropzone } from 'react-dropzone'
import useUploadImages from '../hooks/useUploadImages'

const UploadImages = ({ maxFiles, slides, message, setMessage }) => {

    const uploadImages = useUploadImages()
    const maxSize = 3 * 1024 * 1024

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/heic': [],
        },
        onDrop: (acceptedFiles) => {
            setMessage('')
            if (!acceptedFiles.length) {
                return
            }
            if (acceptedFiles.length > maxFiles) {
                setMessage('You can upload only ' + maxFiles + ' photos!')
                return
            }
            if ((~maxFiles) == (~slides.length)) {
                setMessage('You have already uploaded the maximum possible number of photos!')
                return
            }
            if (acceptedFiles.length > (maxFiles - slides.length)) {
                setMessage('You have only ' + (maxFiles - slides.length) + ' files left to upload.')
                return
            }

            for (const photo of acceptedFiles) {
                if (photo.size > maxSize) {
                    setMessage('One of your photos was too big. Please choose a smaller one.')
                    return
                }
            }
            acceptedFiles.forEach((photo) => {
                uploadImages.upload(photo)
            });

        }
    })

    return (
        <>
            <div {...getRootProps()} className="dropzone-wrapper" onMouseDown={() => {
                if ((~maxFiles) !== (~slides.length)) {
                    setMessage('')
                }
            }}>
                <input {...getInputProps()} />

                <div>
                    <span>Click here to upload your photos or drag and drop them here. <br /> You can upload only *.jpeg, *.png, *.heic files<br /> Maximum number of pictures is 6.</span>
                </div>

            </div>

            {uploadImages.isError && <Alert variant='danger'>{uploadImages.error.message}</Alert>}
            {message && <Alert variant='danger'>{message}</Alert>}

        </>
    )
}

export default UploadImages