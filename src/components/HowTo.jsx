import React from 'react'
import Videomaker from '../assets/images/videomaker_1.png'

const HowTo = () => {
    return (
        <div className='how-to'>
            <p className='h1'>How to use Videomaker?</p>
            <div className='d-flex justify-content-around align-items-center'>
                <img src={Videomaker} alt="" />
                <ol>
                    <li>Download your photos</li>
                    <li>Choose duration and transition for every slide</li>
                    <li>Change the order of slides if needed</li>
                    <li>Add caption to every slide if you want</li>
                    <li>Press the button and just wait until your video is ready</li>
                    <li>Download video on your computer</li>
                </ol>
            </div>
        </div>
    )
}

export default HowTo