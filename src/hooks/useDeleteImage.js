import { useState } from 'react'
// import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'

const useDeleteImage = () => {
	const [error, setError] = useState(null)
	const [isError, setIsError] = useState(false)
	const [isMutating, setIsMutating] = useState(false)

	const mutate = async (image) => {
		setError(null)
		setIsError(false)
		setIsMutating(true)

		try {

			const storageRef = ref(storage, image.path)

			await deleteObject(storageRef)

			// const dbRef = doc(db, 'images', image.id)

			// await deleteDoc(dbRef)

		} catch (e) {
			setIsError(true)
			setError(e)
			console.log("Error when deleting image!!!", error)
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

export default useDeleteImage
