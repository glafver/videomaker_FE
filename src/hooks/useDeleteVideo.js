import { useState } from 'react'
import { ref, deleteObject } from 'firebase/storage'
import { storage } from '../firebase'

const useDeleteVideo = () => {
    const [error, setError] = useState(null)
    const [isError, setIsError] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const mutate = async () => {
        setError(null)
        setIsError(false)
        setIsMutating(true)

        try {

            const userID = localStorage.getItem('userID')
            const orderID = localStorage.getItem('orderID')

            const storageRef = ref(storage, `${userID}/${orderID}.mp4`)

            await deleteObject(storageRef)

            localStorage.removeItem('videoURL')

        } catch (e) {
            setIsError(true)
            setError(e)
            console.log("Error when deleting video!!!", error)
        } finally {
            setIsMutating(false)
        }
    }

    return {
        error,
        isError,
        isMutating,
        mutate,
    }
}

export default useDeleteVideo