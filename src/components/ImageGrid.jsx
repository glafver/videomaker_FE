import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ImageCard from './ImageCard';
import Card from 'react-bootstrap/Card';

const ImageGrid = ({ slides, setMessage, onAddClick, max }) => {

	return (
		<Row xs={2} md={6} className='image-grid'>
			{slides && slides.map((image) => (
				<Col key={image.name} className="d-flex mb-4 image-grid-card-wrapper">
					<ImageCard image={image} setMessage={setMessage} />
				</Col>
			))}
			{max && slides.length < max && (
				<Col className="d-flex mb-4 plus-card-wrapper">
					<Card>
						<img src={'https://storage.googleapis.com/gafver_videomaker/plus.png'} className='' onClick={() => onAddClick()} />
					</Card>
				</Col>
			)}
		</Row>
	);
};

export default ImageGrid;
