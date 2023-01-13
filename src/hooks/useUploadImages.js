import { useState } from 'react'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { storage } from '../firebase'

const useUploadImages = () => {
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [isUploading, setIsUploading] = useState(null)

    const upload = async (image) => {

        setError(null)
        setIsError(null)
        setIsSuccess(null)
        setIsUploading(null)

        try {

            const uuid = uuidv4()

            let userID = localStorage.getItem('userID') || uuidv4()
            localStorage.setItem('userID', userID)

            const ext = image.name.substring(image.name.lastIndexOf('.') + 1)

            const storageFilename = `${uuid}.${ext}`

            const storageRef = ref(storage, `images/${userID}/${storageFilename}`)

            const uploadTask = uploadBytesResumable(storageRef, image)

            await uploadTask.then()

            const url = await getDownloadURL(storageRef)

            const slide = {
                name: storageFilename,
                path: storageRef.fullPath,
                url,
                duration: 1,
                transition: 'fade',
                caption: ''
            }

            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
            slidesLocal.unshift(slide)
            localStorage.setItem('slides', JSON.stringify(slidesLocal))
            window.dispatchEvent(new Event('storage'))

            setIsSuccess(true)

        } catch (e) {
            setError(e)
            setIsError(true)

        } finally {
            setIsUploading(false)
        }
    }

    return {
        error,
        isError,
        isSuccess,
        isUploading,
        upload,
    }
}

export default useUploadImages
