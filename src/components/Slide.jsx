import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { X } from 'react-bootstrap-icons'
import useDeleteImage from '../hooks/useDeleteImage'

const Slide = ({
    image,
    imgIndex,
    setCurrentSlideIndex,
    currentSlideIndex,
    setSlideClicked
}) => {
    const deleteImageMutation = useDeleteImage()
    const deleteSlide = () => {
        deleteImageMutation.mutate(image)

        if (currentSlideIndex === imgIndex) {
            setCurrentSlideIndex(0)
        }
    }

    return (
        <Card className='sortable-slide-wrapper' style={{ backgroundColor: `${imgIndex === currentSlideIndex ? '#d3d3d3' : ''}` }}>
            <img src={image.url} className='sortable-slide-image' onClick={() => {
                setSlideClicked(true)
                setCurrentSlideIndex(imgIndex)
            }} />

            <Button
                className='sortable-slide-delete-button videomaker-btn-pink'
                disabled={deleteImageMutation.isMutating}
                onClick={() => deleteSlide()}>
                <X />
            </Button>

            <Card.Footer>{image.duration} sec.</Card.Footer>
        </Card>
    )
}

export default Slide