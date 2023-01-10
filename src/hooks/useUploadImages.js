import { useState } from 'react'
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { db, storage } from '../firebase'

const useUploadImages = () => {
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(null)
    const [isSuccess, setIsSuccess] = useState(null)
    const [isUploading, setIsUploading] = useState(null)
    // const [progress, setProgress] = useState(null)

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

            // uploadTask.on('state_changed', (uploadTaskSnapshot) => {
            //     setProgress(
            //         Math.round(
            //             (uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 1000
            //         ) / 10
            //     )
            // })

            await uploadTask.then()

            const url = await getDownloadURL(storageRef)

            // const collectionRef = collection(db, `images`)

            const slide = {
                name: storageFilename,
                path: storageRef.fullPath,
                url,
                duration: 1,
                transition: 'fade-in',
                caption: ''
            }

            // await addDoc(collectionRef, slide)

            let slides = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
            slides.unshift(slide)
            localStorage.setItem('slides', JSON.stringify(slides))
            window.dispatchEvent(new Event('storage'))

            // setProgress(null)
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
        // progress,
        upload,
    }
}

export default useUploadImages
