import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { X } from 'react-bootstrap-icons'
import useDeleteImage from '../hooks/useDeleteImage'

const ImageCard = ({ image }) => {
	const deleteImageMutation = useDeleteImage()

	const deleteSlide = () => {
		deleteImageMutation.mutate(image)
	}

	return (
		<>
			<Card>

				<img src={image.url} className='image-body' />

				<Button variant="danger" className='delete-button' disabled={deleteImageMutation.isMutating} onClick={() => deleteSlide()}>
					<X />
				</Button>

			</Card>
		</>
	)
}

export default ImageCard
