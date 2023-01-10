import { useCallback, useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import { useDropzone } from 'react-dropzone'
import useUploadImages from '../hooks/useUploadImages'

const UploadImages = ({ slides, setSlides }) => {

    const uploadImages = useUploadImages()

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles)

        if (!acceptedFiles.length) {
            return
        }

        acceptedFiles.forEach((photo) => {
            uploadImages.upload(photo)
        });

    }, [])

    // useEffect(() => {
    //     if (!uploadImages.isSuccess) {
    //         return
    //     }
    //     let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
    //     setSlides(slidesLocal)

    // }, [uploadImages.isSuccess])


    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
        },
        maxFiles: 5,
        // maxSize: 4 * 1024 * 1024,
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