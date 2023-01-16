import { useState } from 'react'
import { ref, deleteObject } from 'firebase/storage'
import { storage } from '../firebase'

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

			let slidesLocal = JSON.parse(localStorage.getItem('slides'))
			let slidesNew = slidesLocal.filter((slide) => {
				if (image.name !== slide.name) {
					return slide
				}
			})

			localStorage.setItem('slides', JSON.stringify(slidesNew))
			window.dispatchEvent(new Event('storage'))

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
