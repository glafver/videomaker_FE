import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { X } from 'react-bootstrap-icons'
import useDeleteImage from '../hooks/useDeleteImage'

const Slide = ({
    image,
    slides,
    imgIndex,
    setCurrentSlideIndex,
    setSlides,
    currentSlideIndex
}) => {
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
        if (currentSlideIndex === imgIndex) {
            setCurrentSlideIndex(0)
        }
    }

    return (
        <Card className='slide-wrapper'>
            <img src={image.url} className='slide-image' onClick={() => {
                setCurrentSlideIndex(imgIndex)
            }} />

            <Button
                variant="danger"
                className='delete-button'
                disabled={deleteImageMutation.isMutating}
                onClick={() => deleteSlide()}>
                <X />
            </Button>
        </Card>
    )
}

export default Slide