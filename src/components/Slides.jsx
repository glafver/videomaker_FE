import React from 'react'
import Slide from './Slide'
import SortableList, { SortableItem } from "react-easy-sort";
import arrayMove from "array-move";

const Slides = ({
    setCurrentSlideIndex,
    currentSlideIndex,
    slides,
    setSlides
}) => {

    const onSortEnd = (oldIndex, newIndex) => {
        setCurrentSlideIndex(newIndex)
        setSlides((array) => arrayMove(array, oldIndex, newIndex));
        localStorage.setItem('slides', JSON.stringify(arrayMove(slides, oldIndex, newIndex)))
    };

    return (
        <>
            <p className='sortable-slides-description'>Change the order of your slides by dragging them</p>
            <SortableList
                onSortEnd={onSortEnd}
                className='sortable-slides-row'
                draggedItemClassName="sortable-slide-dragged"
            >
                {slides && slides.map((item, index) => (
                    <SortableItem key={index}>
                        <div className='sortable-slide-wrapper' style={{ width: `${item.duration * 100}px` }}>
                            <Slide
                                image={item}
                                imgIndex={index}
                                setCurrentSlideIndex={setCurrentSlideIndex}
                                currentSlideIndex={currentSlideIndex}
                            />
                        </div>
                    </SortableItem>
                ))}
            </SortableList>
        </>
    )
}

export default Slides