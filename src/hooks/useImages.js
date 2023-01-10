import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { v4 as uuidv4 } from 'uuid'

const useImages = () => {

	let userID = localStorage.getItem('userID') || uuidv4()
	localStorage.setItem('userID', userID)

	const collectionRef = collection(db, 'images')

	const queryKey = ['images']

	const queryRef = query(collectionRef, where('userID', '==', userID), orderBy('created', 'desc'))

	const imagesQuery = useFirestoreQueryData(queryKey, queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return imagesQuery

}

export default useImages
