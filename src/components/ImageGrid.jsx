import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ImageCard from './ImageCard'

const ImageGrid = ({ slides, setSlides }) => {

	return (
		<Row xs={6}>
			{slides && slides.map((image, index) => (
				<Col key={index} className="d-flex mb-4">
					<ImageCard image={image} setSlides={setSlides} slides={slides} />
				</Col>
			))}
		</Row>
	)
}

export default ImageGrid
