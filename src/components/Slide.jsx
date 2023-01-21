import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { X } from 'react-bootstrap-icons'
import useDeleteImage from '../hooks/useDeleteImage'

const Slide = ({
    image,
    imgIndex,
    setCurrentSlideIndex,
    currentSlideIndex
}) => {
    const deleteImageMutation = useDeleteImage()
    const deleteSlide = () => {
        deleteImageMutation.mutate(image)
        setCurrentSlideIndex(0)

        if (currentSlideIndex === imgIndex) {
            setCurrentSlideIndex(0)
        }
    }

    return (
        <Card className='sortable-slide' style={{ backgroundColor: `${imgIndex === currentSlideIndex ? '#fff' : ''}` }}>
            <img src={image.url} className='sortable-slide-image' />
            <Button
                className='sortable-slide-delete-button videomaker-btn-pink'
                disabled={deleteImageMutation.isMutating}
                onClick={() => deleteSlide()}>
                <X />
            </Button>

            <Card.Footer
                onClick={() => {
                    setCurrentSlideIndex(imgIndex)
                }}><span>{image.duration} sec.</span>
            </Card.Footer>
        </Card>
    )
}

export default Slide