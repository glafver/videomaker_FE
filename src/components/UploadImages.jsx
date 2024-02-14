import { useRef, forwardRef, useImperativeHandle } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useDropzone } from 'react-dropzone';
import useUploadImages from '../hooks/useUploadImages';
import { Zoom } from 'react-awesome-reveal';
import ClipLoader from "react-spinners/ClipLoader";

const UploadImages = forwardRef(({ maxFiles, slides, message, setMessage, setSlides }, ref) => {
    const { upload, isUploading, isError } = useUploadImages();
    const maxSize = 5 * 1024 * 1024;

    const fileInputRef = useRef();
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/heic': [],
        },
        onDrop: (acceptedFiles) => {
            setMessage('');
            if (!acceptedFiles.length) {
                return;
            }
            if (acceptedFiles.length > maxFiles) {
                setMessage('You can upload only ' + maxFiles + ' photos!');
                return;
            }
            if ((~maxFiles) == (~slides.length)) {
                setMessage('You have already uploaded the maximum possible number of photos!');
                return;
            }
            if (acceptedFiles.length > (maxFiles - slides.length)) {
                setMessage('You have only ' + (maxFiles - slides.length) + ' files left to upload.');
                return;
            }

            for (const photo of acceptedFiles) {
                if (photo.size > maxSize) {
                    setMessage('One of your photos was too big. Please choose a smaller one.');
                    return;
                }
            }
            acceptedFiles.forEach((photo) => {
                upload(photo);
            });
        }
    });

    useImperativeHandle(ref, () => ({
        openFileUpload: () => {
            if ((~maxFiles) !== (~slides.length)) {
                setMessage('');
                fileInputRef.current.click();
            }
        },
    }));

    return (
        <div id='quick-start' className='d-flex flex-column vm-center start-section'>
            <div className='fs-2 fw-bold mb-3 vm-rect'>Quick start</div>
            <div {...getRootProps()} className="dropzone-wrapper" onMouseDown={() => {
                if ((~maxFiles) !== (~slides.length)) {
                    setMessage('');
                }
            }}>
                <input {...getInputProps()} ref={fileInputRef} />
                <Zoom >
                    <div>
                        <span>
                            Click here to upload your photos or drag and drop them here
                            <br />
                            <b>
                                You can upload only *.jpeg, *.png, *.heic files
                                <br />
                                Maximum number of files is 6
                                <br />
                                Maximum file size is 5MB
                            </b>
                        </span>
                    </div>
                </Zoom>
            </div>

            {isError && <Alert variant='danger'>{isError.message}</Alert>}
            {message && <Alert variant='danger'>{message}</Alert>}
            {isUploading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }}>
                    <ClipLoader color="#ffffff" loading={isUploading} size={150} />
                </div>
            )}
        </div>
    );
});

export default UploadImages;