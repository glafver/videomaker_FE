import React, { useState, useEffect } from 'react'
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
            <p>Change the order of your slides by dragging them</p>
            <SortableList
                onSortEnd={onSortEnd}
                className="my-4 row row-cols-6"
                draggedItemClassName="sortable-slide-dragged"
            >
                {slides && slides.map((item, index) => (
                    <SortableItem key={index}>
                        <div className='col sortable-slide'>
                            <Slide
                                image={item}
                                imgIndex={index}
                                setCurrentSlideIndex={setCurrentSlideIndex}
                                currentSlideIndex={currentSlideIndex}
                                setSlides={setSlides}
                                slides={slides}
                            />
                        </div>
                    </SortableItem>
                ))}
            </SortableList>
        </>
    )
}

export default Slides