import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { X } from 'react-bootstrap-icons'
import useDeleteImage from '../hooks/useDeleteImage'

const ImageCard = ({ image }) => {
	const deleteImageMutation = useDeleteImage()

	const deleteSlide = () => {
		deleteImageMutation.mutate(image)
	}

	const deleteImageLocal = () => {
		let slidesLocal = JSON.parse(localStorage.getItem('slides'))
		let slidesNew = slidesLocal.filter((slide) => {
			if (image.name !== slide.name) {
				return slide
			}
		})
		localStorage.setItem('slides', JSON.stringify(slidesNew))
		window.dispatchEvent(new Event('storage'))
	}

	return (
		<>
			<Card>

				<img src={image.url} className='image-body' onError={() => { deleteImageLocal() }} />

				<Button className='delete-button videomaker-btn-pink' disabled={deleteImageMutation.isMutating} onClick={() => deleteSlide()}>
					<X />
				</Button>

			</Card>
		</>
	)
}

export default ImageCard
