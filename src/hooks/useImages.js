import { useState, useEffect } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../firebase';
import axios from 'axios';
import useDeleteImage from '../hooks/useDeleteImage';

const useImages = () => {
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(null);
    const [isUploading, setIsUploading] = useState(null);
    const [slides, setSlides] = useState([]);

    const upload = async (image) => {
        setError(null);
        setIsError(null);
        setIsSuccess(null);
        setIsUploading(true);

        try {
            const previewUrl = URL.createObjectURL(image);

            const uuid = uuidv4();
            let userID = localStorage.getItem('userID') || uuidv4();
            localStorage.setItem('userID', userID);

            const ext = image.name.substring(image.name.lastIndexOf('.') + 1);
            const storageFilename = `${uuid}.${ext}`;
            const storageRef = ref(storage, `/${userID}/${storageFilename}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            await uploadTask.then();

            const url = await getDownloadURL(storageRef);

            const slide = {
                name: storageFilename,
                path: storageRef.fullPath,
                url,
                previewUrl,
                duration: 1,
                transition: 'fade'
            };

            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : [];
            slidesLocal.unshift(slide);
            localStorage.setItem('slides', JSON.stringify(slidesLocal));
            window.dispatchEvent(new Event('storage'));

            setIsSuccess(true);

        } catch (e) {
            setError(e);
            setIsError(true);

        } finally {
            setIsUploading(false);
        }
    };

    const deleteImageMutation = useDeleteImage();

    const deleteSlide = (image) => {
        deleteImageMutation.mutate(image);
    };

    const deleteSlideLocal = (image) => {
        let slidesLocal = JSON.parse(localStorage.getItem('slides'));
        let slidesNew = slidesLocal.filter((slide) => {
            if (image.name !== slide.name) {
                return slide;
            }
        });
        localStorage.setItem('slides', JSON.stringify(slidesNew));
        window.dispatchEvent(new Event('storage'));
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/status/wake_up`);

        window.addEventListener('storage', () => {
            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : [];
            setSlides(slidesLocal);
        });
        window.dispatchEvent(new Event('storage'));
        localStorage.removeItem('videoURL');
        localStorage.removeItem('orderID');
        localStorage.removeItem('soundtrack');
    }, []);

    return {
        error,
        isError,
        isSuccess,
        isUploading,
        upload,
        slides,
        deleteSlide,
        deleteSlideLocal
    };
};

export default useImages;
