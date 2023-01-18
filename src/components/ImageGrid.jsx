import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ImageCard from './ImageCard'

const ImageGrid = ({ slides }) => {

	return (
		<Row xs={2} md={6} className='image-grid'>
			{slides && slides.map((image, index) => (
				<Col key={index} className="d-flex mb-4 image-grid-card-wrapper">
					<ImageCard image={image} />
				</Col>
			))}
		</Row>
	)
}

export default ImageGrid
