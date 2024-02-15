import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { X } from 'react-bootstrap-icons';
import useImages from '../hooks/useImages';

const ImageCard = ({ image, setMessage }) => {
	const { deleteSlideLocal, deleteSlide } = useImages();

	return (
		<>
			<Card>
				<img src={image.previewUrl || image.url} className='image-body' onError={() => { deleteSlideLocal(image); }} />
				<Button className='delete-button' onClick={() => { setMessage(''); deleteSlide(image); }}>
					<X />
				</Button>

			</Card>
		</>
	);
};

export default ImageCard;
