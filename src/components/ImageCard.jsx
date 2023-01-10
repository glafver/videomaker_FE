import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { X } from 'react-bootstrap-icons'
import useDeleteImage from '../hooks/useDeleteImage'

const ImageCard = ({ image, slides, setSlides }) => {
	const deleteImageMutation = useDeleteImage()

	const deleteSlide = () => {
		deleteImageMutation.mutate(image)
		let slidesNew = slides.filter((slide) => {
			if (image.name !== slide.name) {
				return slide
			}
		})
		setSlides(slidesNew)
		localStorage.setItem('slides', JSON.stringify(slidesNew))
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
